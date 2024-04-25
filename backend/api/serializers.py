from .models import User, Resume, Job
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "password", "user_type", "created_at", "updated_at"]
        extra_kwargs = {
            "password": {"write_only": True},
            "created_at": {"read_only": True}
        }

    def create(self, validated_data):
        user_type = validated_data.pop('user_type', None)
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["name"],
            validated_data["password"],
            user_type=user_type
        )
        return user
    
# Resume
class ResumeSerializer(serializers.ModelSerializer):
    
    # skills = serializers.ListField(child=serializers.CharField())
    # experience = serializers.ListField(child=serializers.CharField())
    # qualification = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Resume
        fields = ['id', 'user', 'skills', 'experience', 'qualification', 'resume_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}

class ResumeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'user', 'resume_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}

class ResumeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'user', 'skills', 'experience', 'qualification', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'user', 'title', 'description', 'location', 'salary', 'qualification', 'experience', 'skills', 'deadline', 'job_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}
