from django.shortcuts import render
from .models import User, Resume
from rest_framework import generics
from .serializers import UserSerializer, ResumeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

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