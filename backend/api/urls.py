from django.urls import path
from .views import (
    ResumeCreateView, 
    ResumeUpdateView, 
    ResumeView,
    # ResumeDeleteAPIView, 
    JobCreateAPIView, 
    JobUpdateAPIView, 
    JobDeleteAPIView
)

urlpatterns = [

    # Resume urls
    path('resumes/me/', ResumeView.as_view(), name='resume-me'),
    path('resumes/create/', ResumeCreateView.as_view(), name='resume-create'),
    path('resumes/<int:pk>/update/', ResumeUpdateView.as_view(), name='resume-update'),
    # path('resumes/<int:pk>/delete/', ResumeDeleteAPIView.as_view(), name='resume-delete'),

    # Job urls
    path('jobs/create/', JobCreateAPIView.as_view(), name='job-create'),
    path('jobs/<int:pk>/update/', JobUpdateAPIView.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', JobDeleteAPIView.as_view(), name='job-delete'),
]