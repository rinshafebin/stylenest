from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from Auth.serializers import (
    UserRegistrationSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
    UserSerializer,
    PasswordResetRequestSerializer,
    OTPVerificationSerializer,
    PasswordResetSerializer
)


# ----------------user registration ---------------------

class UserRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data)
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'User created successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------- login ---------------------


class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            return Response({
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------- change password ---------------------

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            if not request.user.check_password(old_password):
                return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

            request.user.set_password(new_password)
            request.user.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------- password reset  ---------------------

class PasswordResetRequest(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationView(APIView):
    def post(self, request):
        print(request.data)
        serializer = OTPVerificationSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Password reset successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --------------------------------- reset password -------------------------------------

# class ForgetPassword(APIView):
    
#     def post(self,request):
#         email = request.data.get('email')
#         if not email:
#             return Response({'error':'email is required'},status=status.HTTP_400_BAD_REQUEST)
        
#         try :
#             user = CustomUser.objects.get(email=email)
#         except CustomUser.DoesNotExist :
#             return Response({'error':'user not found'},status=status.HTTP_400_BAD_REQUEST)
        
        
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = default_token_generator.make_token(user)
        
#         current_site = get_current_site(request)
#         reset_link = f"http://{current_site.domain}/auth/resetpassword/{uid}/{token}/"
        
#         send_mail(
#             subject='Reset Your Password',
#             message=f"Click the link below to reset your password:\n{reset_link}",
#             from_email='admin@myshop.com',
#             recipient_list=[user.email],
#         )
#         return Response({'message': 'Password reset link sent to your email'}, status=status.HTTP_200_OK)




# --------------------------------- setting a new password ----------------------------------

# class ResetPasswordview(APIView):
    
#     def post(self,request,uidb64,token):
#         try :
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = CustomUser.objects.get(pk=uid)
#         except CustomUser.DoesNotExist:
#             return Response({'error':'user not found '},status=status.HTTP_400_BAD_REQUEST)
        
#         if not default_token_generator.check_token(user,token):
#             return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
        
#         new_password = request.data.get('new_password')
#         if not new_password:
#             return Response({'error':'password is required '},status=status.HTTP_400_BAD_REQUEST)
        
#         hashed_password = make_password(new_password)
#         CustomUser.objects.filter(pk=user.pk).update(password=hashed_password)
        
        
        
        # user.set_password(new_password)
        # user.save()
        # return Response({'message': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
# 

# -------------------------- Logout -------------------------------------------
   
# class Logout(APIView):
#     permission_classes=[IsAuthenticated]
    
#     def post(self,request):
#         try:
#             refresh_token = request.data.get('refresh_token')
#             print("recieved token ",refresh_token)
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response({'message':'logout was succesfull'},status=status.HTTP_200_OK)
#         except Exception:
#             print("logout error :")
#             return Response({'message':'logout failed'},status=status.HTTP_400_BAD_REQUEST)


# ----------------     email verification    -------------------------------------



# class EmailVerify(APIView):
#     def get(self,request,uidb64,token):
#         try:
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = get_object_or_404(CustomUser,pk=uid)
#         except(CustomUser.DoesNotExist):
#             user = None
            
#         if user and default_token_generator.check_token(user,token):
#             user.is_active = True
#             user.save()
            
#             return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

