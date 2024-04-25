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
import logging

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
        skills, experience, qualifications = ['Python', 'Django', 'React'], ['Software Developer at Company A (2018-2021)', 'Intern at Company B (2017)'], ['Bachelor of Science in Computer Science']
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
        skills, experience, qualifications = ['Python', 'Django', 'React'], ['Software Developer at Company A (2018-2021)', 'Intern at Company B (2017)'], ['Bachelor of Science in Computer Science']
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