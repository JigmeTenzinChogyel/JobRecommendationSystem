from .models import User, Resume, Company, Job, Application, Notification, Bookmark
from rest_framework import serializers
from django.utils import timezone


# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password', 'user_role', 'bio', 'avatar', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user_role = validated_data.pop('user_role', None)
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["name"],
            validated_data["password"],
            user_role=user_role
        )
        return user

# Resume
class ResumeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Resume
        fields = ['id', 'user', 'skills', 'experience', 'qualification', 'resume_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}

# Company
class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ['id', 'user', 'name', 'email', 'description', 'city', 'country', 'logo', 'created_at', 'updated_at']
        read_only_fields = [ 'user', 'created_at', 'updated_at']

# Job
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'user', 'title', 'description', 'summary', 'min_salary', 'max_salary', 'qualification', 'experience', 'skills', 'deadline', 'job_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}

# Application
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'user', 'job', 'application_status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}, "job": {"read_only": True}}
    
# Bookmark
class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'job', 'created_at', 'updated_at']
        read_only_fields = ['user', 'job', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        job_id = self.context['request'].data.get('job_id')
        # Ensure job exists and is valid
        try:
            job = Job.objects.get(id=job_id)
        except:
            raise serializers.ValidationError("Job not found")
        if Bookmark.objects.filter(user=user, job=job).exists():
            raise serializers.ValidationError("You have already bookmarked this job")

        return Bookmark.objects.create(user=user, job=job, **validated_data)
    
# Notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'job', 'message', 'is_read', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}

# Stats
class StatsSerializer(serializers.Serializer):
    user_count = serializers.IntegerField()
    job_count = serializers.IntegerField()
    company_count = serializers.IntegerField()