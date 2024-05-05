from django.urls import path
from .views import (
    ResumeCreateView, 
    ResumeUpdateView, 
    ResumeDeleteView,
    ResumeView,
    ResumeById,
    ResumeRecommendation,
    ResumeByUserView,
    CompanyCreateView,
    CompanyUpdateView,
    CompanyDeleteView,
    CompanyView,
    CompanyViewByUserId,
    CompanyViewByCompanyId,
    JobCreateView,
    JobUpdateView, 
    JobDeleteView,
    JobRecommendationView,
    JobSimilarView,
    JobRetrieveAPIView,
    JobByBookmark,
    RandomJobView,
    UserJobListView,
    ApplicationCreateView,
    ApplicationUpdateView,
    ApplicationDeleteView,
    ApplicationByJobAndUser,
    ApplicationsByJob,
    BookmarkCreateView,
    BookmarkDeleteView,
    BookmarkByJobView,
)

urlpatterns = [

    # Resume urls
    path('resumes/create/', ResumeCreateView.as_view(), name='resume-create'),
    path('resumes/update/', ResumeUpdateView.as_view(), name='resume-update'),
    path('resumes/delete/', ResumeDeleteView.as_view(), name='resume-delete'),
    path('resumes/me/', ResumeView.as_view(), name='resume-me'),
    path('resumes/<int:pk>/', ResumeById.as_view(), name='resume-by-id'),
    path('resumes/recommend', ResumeRecommendation.as_view(), name='resume-recommendation'),
    path('resumes/user', ResumeByUserView.as_view(), name='resume-by-user'),

    # Company urls
    path('company/create/', CompanyCreateView.as_view(), name='company_create'),
    path('company/update/', CompanyUpdateView.as_view(), name='company_update'),
    path('company/delete/', CompanyDeleteView.as_view(), name='company_delete'),
    path('company/', CompanyView.as_view(), name='company'),
    path('company/user', CompanyViewByUserId.as_view(), name='company-user-id'),
    path('company/<int:pk>/', CompanyViewByCompanyId.as_view(), name='company'),

    # Job urls
    path('jobs/create/', JobCreateView.as_view(), name='job-create'),
    path('jobs/<int:pk>/update/', JobUpdateView.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', JobDeleteView.as_view(), name='job-delete'),
    path('jobs/recommended', JobRecommendationView.as_view(), name='job-recommendation'),
    path('jobs/<int:pk>/', JobRetrieveAPIView.as_view(), name='job-detail'),
    path('jobs/random/', RandomJobView.as_view(), name='random_job'),
    path('jobs/similar', JobSimilarView.as_view(), name='similar_job'),
    path('jobs/user/', UserJobListView.as_view(), name='user_job_list'),
    path('jobs/bookmark/', JobByBookmark.as_view(), name='jobs_by_bookmark'),

    # Application urls
    path('applications/create/', ApplicationCreateView.as_view(), name='application_create'),
    path('applications/<int:pk>/update/', ApplicationUpdateView.as_view(), name='application_update'),
    path('applications/<int:pk>/delete/', ApplicationDeleteView.as_view(), name='application_delete'),
    path('applications/job', ApplicationByJobAndUser.as_view(), name='application_by_job_and_user'),
    path('applications', ApplicationsByJob.as_view(), name='applications_by_job'),

    # Bookmark urls
    path('bookmarks/create/', BookmarkCreateView.as_view(), name='bookmark_create'),
    path('bookmarks/<int:pk>/delete/', BookmarkDeleteView.as_view(), name='bookmark_delete'),
    path('bookmarks/job', BookmarkByJobView.as_view(), name='bookmark_job'),
]