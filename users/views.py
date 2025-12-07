from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from cart.models import CartItem

from django.shortcuts import get_object_or_404
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from users.models import CustomUser

from users.serializers import (
    UserRegistrationSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
    UserSerializer,
    ViewAllUsersSerializer,  
)
from django.core.mail import send_mail, BadHeaderError
from django.utils import timezone
from django.contrib.auth.password_validation import validate_password
import random
from datetime import timedelta


# ------------------------- Registration ---------------------
class UserRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------- Login ----------------------------
class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data

            cart_count = CartItem.objects.filter(user=user).count()

            return Response({
                "message": "Login successful",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": user_data,
                "cart_count": cart_count,  # ← ADD THIS
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ------------------------- Change Password ---------------------
class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.validated_data["old_password"]
            new_password = serializer.validated_data["new_password"]

            if not request.user.check_password(old_password):
                return Response(
                    {"error": "Old password is incorrect"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            request.user.set_password(new_password)
            request.user.save()

            return Response(
                {"message": "Password changed successfully"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# ------------------------- Password Reset Request ---------------------
class PasswordResetRequest(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"email": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"email": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate OTP
        user.otp = random.randint(100000, 999999)
        user.otp_expiration = timezone.now() + timedelta(minutes=5)
        user.otp_verified = False
        user.save()

        try:
            send_mail(
                subject="Password Reset OTP",
                message=f"Your OTP for password reset is: {user.otp}",
                from_email=None,  # will use DEFAULT_FROM_EMAIL
                recipient_list=[user.email],
                fail_silently=False,
            )
        except BadHeaderError:
            return Response({"error": "Invalid email header."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "OTP sent successfully."}, status=status.HTTP_200_OK)


# ------------------------- OTP Verification ---------------------
class OTPVerificationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({"error": "Email and OTP are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"email": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

        if str(user.otp) != str(otp):
            return Response({"otp": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        if timezone.now() >= user.otp_expiration:
            return Response({"otp": "OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)

        user.otp_verified = True
        user.save()
        return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)


# ------------------------- Password Reset ---------------------
class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        if not email or not password or not confirm_password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"email": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.otp_verified:
            return Response({"otp": "OTP verification required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(password)
        except Exception as e:
            return Response({"password": list(e.messages)}, status=status.HTTP_400_BAD_REQUEST)

        # Save new password and reset OTP
        user.set_password(password)
        user.otp_verified = False
        user.otp = None
        user.otp_expiration = None
        user.save()

        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)


# ------------------------- Logout ---------------------
class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout successful"},
                status=status.HTTP_200_OK
            )
        except Exception:
            return Response(
                {"error": "Invalid or expired refresh token"},
                status=status.HTTP_400_BAD_REQUEST
            )


# ------------------------- Email Verification ---------------------
class EmailVerify(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
        except Exception:
            user = None

        if user and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response(
                {"message": "Email verified successfully"},
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid or expired token"},
            status=status.HTTP_400_BAD_REQUEST
        )


# ------------------------- Admin User Views ---------------------
class ViewAllUsers(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.filter(is_superuser=False)
        serializer = ViewAllUsersSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetail(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        user = get_object_or_404(CustomUser, pk=pk)
        serializer = ViewAllUsersSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
