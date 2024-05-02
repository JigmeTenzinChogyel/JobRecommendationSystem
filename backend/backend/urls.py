from django.contrib import admin
from django.urls import path, include
from api.views import (
    CreateUserView,
    CurrentUserView,
    UserDetailView,
    UpdateUserView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/user/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/user/update/", UpdateUserView.as_view(), name="update_user"),
    path('api/user/me/', CurrentUserView.as_view(), name='current_user'),
    path('api/user/<int:pk>/', UserDetailView.as_view(), name='user_from_id'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
