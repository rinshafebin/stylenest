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


# --------------- Reset password serializer ------------------------------

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = CustomUser.objects.get(email=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")

        user.otp_generate()

        try:
            send_mail(
                subject="Password Reset OTP",
                message=f"Your OTP for password reset is: {user.otp}",
                from_email="noreply@yourapp.com",
                recipient_list=[user.email],
                fail_silently=False,
            )
        except BadHeaderError:
            raise serializers.ValidationError("Invalid header found.")
        except Exception:
            raise serializers.ValidationError("Failed to send email. Please try again later.")

        return value

# --------------- otp verification serializer ------------------------------

class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.IntegerField()

    def validate(self, data):
        try:
            user = CustomUser.objects.get(email=data["email"])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({"email": "User not found."})

        if user.otp != data["otp"]:
            raise serializers.ValidationError({"otp": "Invalid OTP."})

        if timezone.now() >= user.otp_expiration:
            raise serializers.ValidationError({"otp": "OTP has expired."})

        user.otp_verified = True
        user.save()
        return data

# ---------------password reset serializer ------------------------------

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")

        try:
            user = CustomUser.objects.get(email=data['email'])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({"email": "Email not found."})

        if not user.otp_verified:
            raise serializers.ValidationError({"otp": "OTP verification required."})

        validate_password(data['password'])
        return data

    def save(self):
        user = CustomUser.objects.get(email=self.validated_data['email'])
        user.set_password(self.validated_data['password'])
        user.otp_verified = False
        user.otp = None
        user.otp_expiration = None
        user.save()
        return user

# ----------------------------------- ViewAllUsersSerializer ------------------------------


class ViewAllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_superuser', 'phone_number', 'address', 'is_active']
