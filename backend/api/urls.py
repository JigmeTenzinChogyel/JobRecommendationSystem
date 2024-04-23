from django.urls import path
from .views import ResumeCreateAPIView, ResumeUpdateAPIView, ResumeDeleteAPIView

urlpatterns = [
    path('resumes/create/', ResumeCreateAPIView.as_view(), name='resume-create'),
    path('resumes/<int:pk>/update/', ResumeUpdateAPIView.as_view(), name='resume-update'),
    path('resumes/<int:pk>/delete/', ResumeDeleteAPIView.as_view(), name='resume-delete'),
]