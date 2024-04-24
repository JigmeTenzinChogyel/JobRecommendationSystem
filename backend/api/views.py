from django.shortcuts import render
from .models import User, Resume, Job
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import UserSerializer, ResumeSerializer, JobSerializer
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

# Resume
class ResumeCreateAPIView(generics.CreateAPIView, generics.RetrieveUpdateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return Resume.objects.get(user=self.request.user)
        except Resume.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        resume = self.get_object()
        if resume:
            serializer = self.get_serializer(resume)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        resume = self.get_object()
        if resume:
            serializer = self.get_serializer(resume, data=request.data, partial=True)
        else:
            serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResumeUpdateAPIView(generics.UpdateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

class ResumeDeleteAPIView(generics.DestroyAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

# Jobs
class JobCreateAPIView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Job.objects.filter(user=user)

    def get(self, request, *args, **kwargs):
        jobs = self.get_queryset()
        serializer = self.get_serializer(jobs, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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