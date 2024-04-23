from django.shortcuts import render
from .models import User, Resume
from rest_framework import generics
from .serializers import UserSerializer, ResumeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from api.utils.extract import read_pdf
from api.machine.preprocess import preprocess_text
from api.machine.ner import process

# User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Resume
class ResumeCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Resume.objects.filter(user=user)

    def perform_create(self, serializer):
        print(self)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class ResumeUpdateAPIView(generics.UpdateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

class ResumeDeleteAPIView(generics.DestroyAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]


text= read_pdf("C:/Users/kinle/Documents/Git Hub/JobRecommendationSystem/backend/media/resumes/cv-template.pdf")
res = preprocess_text(text)
skill = process(res)
print(skill)