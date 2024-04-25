from django.shortcuts import render
from .models import User, Resume, Job
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import (
    UserSerializer, 
    ResumeUpdateSerializer,
    ResumeSerializer,
    ResumeCreateSerializer,
    JobSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from api.utils.extract import read_pdf
from api.machine.preprocess import preprocess_text
from api.machine.ner import process
import logging
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity



logger = logging.getLogger(__name__)

# User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Resume

class ResumeView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResumeSerializer

    def get_object(self):
        try:
            return self.request.user.resume
        except Resume.DoesNotExist:
            return None

class ResumeCreateView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)
        logger.info(f"file: {resume.resume_file.path}")  # or resume.resume_file.url

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
    queryset = Resume.objects.all()
    serializer_class = ResumeUpdateSerializer
    permission_classes = [IsAuthenticated]

# class ResumeDeleteAPIView(generics.DestroyAPIView):
#     queryset = Resume.objects.all()
#     serializer_class = ResumeSerializer
#     permission_classes = [IsAuthenticated]

# Jobs
class JobRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        job = serializer.save(user=self.request.user)
        file_path = job.job_file.path
        logger.info(f"file path: {file_path}")
        if file_path:
            extract = read_pdf(f"{job.job_file.path}")
            preprocessed = preprocess_text(extract + job.description)
            skills, experience, qualifications = process(preprocessed)
        else:
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

class JobUpdateAPIView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

class JobDeleteAPIView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        logger.info(f"user: {user}")
        resume = Resume.objects.filter(user=user).first()
        if resume:
            skills = resume.skills[0]
            experience = resume.experience
            qualification = resume.qualification
        logger.info(f"skill {skills}")
        vectorizer = CountVectorizer()
        resume_vector = vectorizer.fit_transform(["python", "java"])
        logger.info(f"vector: {resume_vector}")

        # text= read_pdf(f"C:/Users/kinle/Documents/Git Hub/JobRecommendationSystem/backend/media/{resume.resume_file}")
        # res = preprocess_text(text)
        # skill = process(res)
        # print(skill)
        queryset = Job.objects.all()
        logger.info(queryset)
        job_vector = vectorizer.fit_transform(["c++", "javascript", "SQL"])
        cosine_sim = cosine_similarity(resume_vector, job_vector)
        logger.info(f"cosine_sim: {cosine_sim}")


        # logger.info(queryset)
        # You can apply additional filters or logic here based on the user's resume
        return queryset


# text= read_pdf("C:/Users/kinle/Documents/Git Hub/JobRecommendationSystem/backend/media/resumes/cv-template.pdf")
# res = preprocess_text(text)
# skill = process(res)
# print(skill)