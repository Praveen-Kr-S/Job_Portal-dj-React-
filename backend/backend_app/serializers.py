from rest_framework import serializers
from .models import Job, Application
from django.contrib.auth.models import User

# class RegisterSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True)
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user




class JobSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    class Meta:
        model = Job
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    # job = serializers.StringRelatedField()
    # applicant = serializers.StringRelatedField()
    class Meta:
        model = Application
        fields = '__all__'


