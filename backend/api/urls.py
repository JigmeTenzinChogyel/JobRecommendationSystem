from django.urls import path
from .views import ResumeCreateAPIView, ResumeUpdateAPIView, ResumeDeleteAPIView, JobCreateAPIView, JobUpdateAPIView, JobDeleteAPIView

urlpatterns = [

    # Resume urls
    path('resumes/create/', ResumeCreateAPIView.as_view(), name='resume-create'),
    path('resumes/<int:pk>/update/', ResumeUpdateAPIView.as_view(), name='resume-update'),
    path('resumes/<int:pk>/delete/', ResumeDeleteAPIView.as_view(), name='resume-delete'),

    # Job urls
    path('jobs/create/', JobCreateAPIView.as_view(), name='job-create'),
    path('jobs/<int:pk>/update/', JobUpdateAPIView.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', JobDeleteAPIView.as_view(), name='job-delete'),
]