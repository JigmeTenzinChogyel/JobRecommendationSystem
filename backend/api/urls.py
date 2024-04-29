from django.urls import path
from .views import (
    ResumeCreateView, 
    ResumeUpdateView, 
    ResumeView,
    # ResumeDeleteAPIView, 
    JobCreateView,
    JobRetrieveAPIView, 
    JobUpdateAPIView, 
    JobDeleteAPIView,
    JobRecommendationView,
    RandomJobView,
    UserJobListView
)

urlpatterns = [

    # Resume urls
    path('resumes/me/', ResumeView.as_view(), name='resume-me'),
    path('resumes/create/', ResumeCreateView.as_view(), name='resume-create'),
    path('resumes/<int:pk>/update/', ResumeUpdateView.as_view(), name='resume-update'),
    # path('resumes/<int:pk>/delete/', ResumeDeleteAPIView.as_view(), name='resume-delete'),

    # Job urls
    path('jobs/<int:pk>/', JobRetrieveAPIView.as_view(), name='job-detail'),
    path('jobs/create/', JobCreateView.as_view(), name='job-create'),
    path('jobs/<int:pk>/update/', JobUpdateAPIView.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', JobDeleteAPIView.as_view(), name='job-delete'),
    path('jobs/recommended/', JobRecommendationView.as_view(), name='job-list'),
    path('jobs/random/', RandomJobView.as_view(), name='random_job'),
    path('jobs/user/', UserJobListView.as_view(), name='user_job_list'),
]