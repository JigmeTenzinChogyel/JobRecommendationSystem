from .models import User, Resume
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
    
class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'user', 'skills', 'experience', 'qualification',  'resume_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {"user": {"read_only": True}}