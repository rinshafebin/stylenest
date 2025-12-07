from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail, BadHeaderError
from django.utils import timezone
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email','is_superuser']


# ---------------user registration serializer ------------------------------


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        
        extra_kwargs = {
            'username': {'required': True, 'error_messages': {'required': 'Please enter your username'}},
            'email': {'required': True, 'error_messages': {'required': 'Please enter your email'}},
            'password': {'write_only': True, 'required': True, 'error_messages': {'required': 'Please enter your password'}},
        }
        
    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


# ---------------Login serializer ------------------------------

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Both email and password are required.")

        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")

        data['user'] = user
        return data

# ---------------changepassword serializer ------------------------------


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


# ----------------------------------- ViewAllUsersSerializer ------------------------------


class ViewAllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_superuser', 'phone_number', 'address', 'is_active']
