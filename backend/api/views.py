from .models import (
    User, 
    Resume, 
    Job,
    Company,
    Application,
    Notification,
    Bookmark,
)
from .serializers import (
    UserSerializer, 
    ResumeSerializer,
    JobSerializer,
    CompanySerializer,
    ApplicationSerializer,
    NotificationSerializer,
    BookmarkSerializer,
)
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.utils.extract import read_pdf
from api.machine.preprocess import preprocess_text
from api.machine.ner import process
import logging
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.http import Http404
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .permissions import IsRecruiter, IsSeeker
from rest_framework.exceptions import ValidationError, NotFound, bad_request, server_error
from django.db import transaction

logger = logging.getLogger(__name__)

# User

# create a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# update user
class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        user_role = serializer.validated_data.get('user_role')
        instance = serializer.save(exclude=('user_role',))  # Exclude user_role from update
        if user_role:
            instance.user_role = user_role
            instance.save()
        return instance

# get the current user
class CurrentUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# get user from id
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs.get('pk')
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")

# Resume
class ResumeCreateView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        if Resume.objects.filter(user=user).exists():
            return Response(
                {"error": "You already have a resume. Please update your existing resume."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)
        # logger.info(f"file: {resume.resume_file.path}")

        # Read the uploaded resume file
        extract = read_pdf(f"{resume.resume_file.path}")
        preprocessed = preprocess_text(extract)
        skills, experience, qualifications = process(preprocessed)

        resume.skills = skills
        resume.experience = experience
        resume.qualification = qualifications
        resume.save()

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)
    
class ResumeUpdateView(generics.UpdateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    queryset = Resume.objects.all()

    def get_object(self):
        try:
            return Resume.objects.get(user=self.request.user)
        except Resume.DoesNotExist:
            return Response({"error": "You don't have a resume."}, status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        resume = self.get_object()
        update_file = False

        if 'resume_file' in serializer.validated_data:
            update_file = True
            if resume.resume_file:
                default_storage.delete(resume.resume_file.path)

        instance = serializer.save(user=self.request.user)

        if update_file:
            # logger.info(f"file: {instance.resume_file.path}")
            # Read the uploaded resume file
            extract = read_pdf(f"{instance.resume_file.path}")
            preprocessed = preprocess_text(extract)
            skills, experience, qualifications = process(preprocessed)

            instance.skills = skills
            instance.experience = experience
            instance.qualification = qualifications
            instance.save()

class ResumeDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Resume.objects.all()

    def get_object(self):
        try:
            return Resume.objects.get(user=self.request.user)
        except Resume.DoesNotExist:
            return Response({"error": "You don't have a resume."}, status=status.HTTP_404_NOT_FOUND)

    def perform_destroy(self, instance):
        if instance.resume_file:
            default_storage.delete(instance.resume_file.path)
        instance.delete()

# get the current user resume
class ResumeView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsSeeker]
    serializer_class = ResumeSerializer

    def get_object(self):
        try:
            return self.request.user.resume
        except Resume.DoesNotExist:
            raise NotFound("resume not found")
        
class ResumeById(generics.RetrieveAPIView):
    queryset = Resume.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ResumeSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')
        if not pk:
            raise NotFound("Resume ID is required")
        try:
            resume = Resume.objects.get(id=pk)
            return resume
        except Resume.DoesNotExist:
            raise NotFound("Resume Not Found")

# Resume Recommendation
class ResumeRecommendation(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsRecruiter]
    serializer_class = ResumeSerializer

    def get_queryset(self):
        job_text = self.get_job_text()
        
        if isinstance(job_text, Response):
            return []
        
        resumes = Resume.objects.all()

        if not resumes:
            raise NotFound("Resume Not Found")
        
        recommend_resumes = self.recommend_resumes(job_text, resumes)
        return recommend_resumes

    def get_job_text(self):
        job_id = self.request.query_params.get('job_id')
        try:
            job = Job.objects.get(id=job_id)
            skills = ' '.join(job.skills) if job.skills else ''
            experience = ' '.join(job.experience) if job.experience else ''
            qualification = ' '.join(job.qualification) if job.qualification else ''
            job_text = ' '.join([skills, experience, qualification])
            return job_text
        except Job.DoesNotExist:
            raise NotFound("Job Not Found")

    def recommend_resumes(self, job_text, resumes):
        resume_texts = []
        for resume in resumes:
            skills = ' '.join(resume.skills) if resume.skills else ''
            experience = ' '.join(resume.experience) if resume.experience else ''
            qualification = ' '.join(resume.qualification) if resume.qualification else ''
            resume_text = ' '.join([skills, experience, qualification])
            resume_texts.append(resume_text)
        logger.info(resume_texts)
        vectorizer = CountVectorizer()
        resume_vector = vectorizer.fit_transform(resume_texts)
        job_vector = vectorizer.transform([job_text])

        similarities = cosine_similarity(job_vector, resume_vector)
        resume_indices = similarities.argsort()[0][::-1]
        resume_indices = resume_indices.tolist()

        recommended_resumes = [resumes[index] for index in resume_indices]
        return recommended_resumes

# Company
class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class CompanyUpdateView(generics.UpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all()

    def get_object(self):
        try:
            company = Company.objects.get(user=self.request.user)
        except Company.DoesNotExist:
            raise Http404("Company Not Found")
        return company

    def perform_update(self, serializer):
        company = self.get_object()
        update_logo = False

        if 'logo' in serializer.validated_data:
            update_logo = True
            if company.logo:
                default_storage.delete(company.logo.path)

        instance = serializer.save(user=self.request.user)

        if update_logo:
            instance.save()

class CompanyDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all()

    def get_object(self):
        try:
            company = Company.objects.get(user=self.request.user)
        except Company.DoesNotExist:
            raise Http404("Company Not Found")
        return company

    def perform_destroy(self, instance):
        if instance.logo:
            default_storage.delete(instance.logo.path)
        instance.delete()

# logged in user company
class CompanyView(generics.RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_object(self):
        try:
            company = self.request.user.company
            logger.info(f"Company: {company}")
            return company
        except Company.DoesNotExist:
            raise NotFound("Company not found.")

# company from user id
class CompanyViewByUserId(generics.RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.request.query_params.get('user_id')
        if not user_id:
            raise NotFound("User ID is required.")

        try:
            user = User.objects.get(id=user_id)
            company = user.company
            return company
        except User.DoesNotExist:
            raise NotFound("User not found.")
        except Company.DoesNotExist:
            raise NotFound("Company not found for the provided user.")


class CompanyViewByCompanyId(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        pk = self.kwargs.get('pk')
        if not pk:
            raise NotFound("Company ID is required.")

        try:
            company = Company.objects.get(id=pk)
            return company
        except Company.DoesNotExist:
            raise NotFound("Company not found.")
        
# Jobs
# create job
class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.user_role == "seeker":
            return Response(
                {"errors": "Seeker not allowd"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        job = serializer.save(user=self.request.user)
        file_path = job.job_file
        # logger.info(f"file path: {file_path}")
        if file_path:
            extract = read_pdf(f"{job.job_file.path}")
            logger.info(f"concat: {extract + job.description}")
            preprocessed = preprocess_text(extract + job.description)
            skills, experience, qualifications = process(preprocessed)
        else:
            logger.info(f"concat: {job.description}")
            preprocessed = preprocess_text(job.description)
            skills, experience, qualifications = process(preprocessed)
        job.skills = skills
        job.experience = experience
        job.qualification = qualifications
        job.save()

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)
    
class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            job_id = self.kwargs.get('pk')
            job = Job.objects.get(id=job_id, user=self.request.user)
        except Job.DoesNotExist:
            raise Http404("Job Not Found")
        return job

    def perform_update(self, serializer):
        job = self.get_object()
        update_file = False

        if 'job_file' in serializer.validated_data:
            update_file = True
            if job.job_file:
                default_storage.delete(job.job_file.path)

        instance = serializer.save()

        if update_file:
            extract = read_pdf(f"{instance.job_file.path}")
            logger.info(f"concat: {extract + instance.description}")
            preprocessed = preprocess_text(extract + instance.description)
            skills, experience, qualifications = process(preprocessed)

            instance.skills = skills
            instance.experience = experience
            instance.qualification = qualifications
            instance.save()

class JobDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsRecruiter]
    queryset = Job.objects.all()

    def get_object(self):
        try:
            job_id = self.kwargs.get('pk')
            job = Job.objects.get(id=job_id, user=self.request.user)
        except Job.DoesNotExist:
            raise Http404("Job Not Found")
        return job

    def perform_destroy(self, instance):
        with transaction.atomic():
            # Delete related Application objects
            Application.objects.filter(job_id=instance.id).delete()
            
            # Delete the Job instance
            if instance.job_file:
                default_storage.delete(instance.job_file.path)
            instance.delete()
    
# get a particular job
class JobRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

# get the job user created
class UserJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Job.objects.filter(user=user)

# Job Recommendation
class JobRecommendationView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobSerializer

    def get_queryset(self):
        user = self.request.user
        resume_text = self.get_resume_text(user)

        if isinstance(resume_text, Response):
            return []  # Return an empty list if there is an error with the resume

        try:
            jobs = Job.objects.filter(deadline__gte=timezone.now().date())
        except Exception as e:
            return Response(
                {"error": f"Error retrieving jobs: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if not jobs:
            return Response(
                {"error": "No active jobs found."},
                status=status.HTTP_404_NOT_FOUND
            )

        recommended_jobs = self.recommend_jobs(resume_text, jobs)
        return recommended_jobs

    def get_resume_text(self, user):
        try:
            resume = Resume.objects.get(user=user)
        except Resume.DoesNotExist:
            return Response(
                {"error": "You don't have a resume. Please create one."},
                status=status.HTTP_404_NOT_FOUND
            )

        skills = ' '.join(resume.skills) if resume.skills else ''
        experience = ' '.join(resume.experience) if resume.experience else ''
        qualification = ' '.join(resume.qualification) if resume.qualification else ''
        resume_text = ' '.join([skills, experience, qualification])

        if not resume_text:
            return Response(
                {"error": "Your resume doesn't have any skills, experience, or qualifications."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return resume_text

    def recommend_jobs(self, resume_text, jobs):
        job_texts = []
        for job in jobs:
            skills = ' '.join(job.skills) if job.skills else ''
            experience = ' '.join(job.experience) if job.experience else ''
            qualification = ' '.join(job.qualification) if job.qualification else ''
            job_text = ' '.join([skills, experience, qualification])
            job_texts.append(job_text)

        vectorizer = CountVectorizer()
        job_vectors = vectorizer.fit_transform(job_texts)
        resume_vector = vectorizer.transform([resume_text])

        similarities = cosine_similarity(resume_vector, job_vectors)
        job_indices = similarities.argsort()[0][::-1]
        job_indices = job_indices.tolist()

        recommended_jobs = [jobs[index] for index in job_indices]
        return recommended_jobs

# similar jobs
class JobSimilarView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer

    def get_queryset(self):
        job_id = self.request.query_params.get('job_id')
        job_text = self.get_job_text(job_id)

        if isinstance(job_text, Response):
            return []  # Return an empty list if there is an error with the resume

        try:
            jobs = Job.objects.filter(deadline__gte=timezone.now().date()).exclude(id=job_id if job_id else None)        
        except Exception as e:
            raise server_error(f"Error retrieving jobs: {str(e)}")

        if not jobs:
            raise NotFound("No active jobs found")
        
        similar_jobs = self.similar_jobs(job_text, jobs)
        return similar_jobs

    def get_job_text(self, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            raise NotFound("Job Not Found")

        skills = ' '.join(job.skills) if job.skills else ''
        experience = ' '.join(job.experience) if job.experience else ''
        qualification = ' '.join(job.qualification) if job.qualification else ''
        job_text = ' '.join([skills, experience, qualification])

        if not job_text:
            raise bad_request("Your job doesn't have any skills, experience, or qualifications")

        return job_text

    def similar_jobs(self, job_text, jobs):
        job_texts = []
        for job in jobs:
            skills = ' '.join(job.skills) if job.skills else ''
            experience = ' '.join(job.experience) if job.experience else ''
            qualification = ' '.join(job.qualification) if job.qualification else ''
            job_text = ' '.join([skills, experience, qualification])
            job_texts.append(job_text)
        
        vectorizer = CountVectorizer()
        similar_job_vector= vectorizer.fit_transform(job_texts)
        job_vectors = vectorizer.transform([job_text])

        similarities = cosine_similarity(job_vectors, similar_job_vector)
        job_indices = similarities.argsort()[0][::-1]
        job_indices = job_indices.tolist()

        similar_jobs = [jobs[index] for index in job_indices]
        return similar_jobs

# random list of jobs 
class RandomJobView(generics.ListAPIView):

    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        queryset = self.get_queryset().order_by('?')
        random_job = get_object_or_404(queryset)
        return random_job
    
# Application
class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsSeeker]

    def perform_create(self, serializer):
        serializer.save(job_id=self.request.data.get('id'))
        # Get the authenticated user
        user = User.objects.get(id=self.request.user.id)
        job_id=self.request.data.get('id')
        job = Job.objects.get(id=job_id)
        # Create a new notification
        notification = Notification.objects.create(
            user=user,
            job=job,
            message=f"{user.name} applied for the job {job.title}"
        )
        notification.save()

class ApplicationUpdateView(generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_object(self):
        try:
            app_id = self.kwargs.get('pk')
            app = Application.objects.get(id=app_id)
        except Application.DoesNotExist:
            raise Http404("Application Not Found")
        return app
    
    def perform_update(self, serializer):
            with transaction.atomic():
                # Retrieve the application instance
                application = self.get_object()
                user = application.user
                # Retrieve the job associated with the application
                job = application.job
                # Check if the job's deadline has passed
                if job.deadline < timezone.now().date():
                    raise ValidationError("Job deadline has passed, application cannot be updated")
                # Proceed with the update if the deadline has not passed
                instance = serializer.save()
                notification = Notification.objects.create(
                    user=user,
                    job=job,
                    message=f"{user.name} your application has been {instance.application_status}"
                )
                notification.save()

# Bookmark
# create
class BookmarkCreateView(generics.CreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated, IsSeeker]

    def perform_create(self, serializer):
        serializer.save(job_id=self.request.data.get('id'))

# delete
class BookmarkDeleteView(generics.DestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated, IsSeeker]

    def get_object(self):
        try:
            book_id = self.kwargs.get('pk')
            bookmark = Bookmark.objects.get(id=book_id)
        except Bookmark.DoesNotExist:
            raise Http404("Job Not Found")
        return bookmark

    def perform_destroy(self, instance):
        instance.delete()

# get the bookmark for the current user and the job
class BookmarkFromJobView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get_object(self):
        user = self.request.user
        job_id = self.kwargs.get('job_id')

        try:
            bookmark = Bookmark.objects.get(user=user, job_id=job_id)
            return bookmark
        except Bookmark.DoesNotExist:
            raise NotFound("Job Not Found")
