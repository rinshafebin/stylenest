from django.shortcuts import render
from rest_framework.views import APIView
from Auth.serializers import UserRegistrationSerializer,LoginSerializer,ChangePasswordSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from Auth.models import CustomUser,PasswordResetOTP
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes,force_str
from django.urls import reverse
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404 
from django.contrib.auth.hashers import make_password
import random 




# Create your views here.
# --------------------------  registration  -------------------------------------------

class UserRegistration(APIView):
    def post(self,request):
        print("Registration endpoint hit")
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # validated_data =serializer.validated_data
            # validated_data.pop('password2')
            
            # user = CustomUser.objects.create(
            #     username =validated_data['username'],
            #     email = validated_data['email'],
            #     password = make_password(validated_data['password']),
            #     is_active = False
            # )
            
            serializer.save()
            
            # current_site = get_current_site(request)
            # uid = urlsafe_base64_encode(force_bytes(user.pk)) 
            # token = default_token_generator.make_token(user)
            # verification_link = f"http://{current_site.domain}{reverse('emailverify', kwargs={'uidb64':uid,'token':token})}"
            
            # subject = 'Activate Your Account'
            # message = f'hi{user.username},\nPlease click the link below to verify your email and activate your account : \n{verification_link}'
            # from_email = settings.DEFAULT_FROM_EMAIL
            # recipient_list = [user.email]
            # send_mail(subject,message,from_email,recipient_list,fail_silently = False)
            # # //celery server
                                                                  
            return Response({'message':'user created succesfully ,please check your mail to verify your account'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


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




    
# -------------------------- Login  -------------------------------------------


class Login(APIView):
    def post(self,request):
        print('data',request.data)
        serilaizer = LoginSerializer(data=request.data)
        if serilaizer.is_valid():
            user = serilaizer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
                        
            return Response({
              'message':'login was succesfull',
              'refresh':str(refresh) ,
              'access': str(refresh.access_token),
              'user':user_data
            },status=status.HTTP_200_OK)
            print(Response)
        return Response(serilaizer.errors,status=status.HTTP_400_BAD_REQUEST)




# -------------------------- Change password -------------------------------------------

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        user = request.user
        serializer = ChangePasswordSerializer(data =request.data)
        
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            
            if not user.check_password(old_password):
                return Response({'error':'old password is incorrect'},status=status.HTTP_400_BAD_REQUEST)
             
            user.set_password(new_password)
            user.save()
            
            return Response({'message':'Password Changed succesfully '},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            


# -------------------------- Logout -------------------------------------------
   
class Logout(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message':'logout was succesfull'},status=status.HTTP_200_OK)
        except Exception:
            return Response({'message':'logout failed'},status=status.HTTP_400_BAD_REQUEST)



# ------------------------password resetting by otp---------------------------------

class ResetPasswordOTP(APIView):
    def post(self,request):
        email = request.data.get('email')
        if not email:
            return Response({'error':'email is required'},status=status.HTTP_400_BAD_REQUEST)
        
        try :
            user = CustomUser.objects.get(email=email)
        except:
            return Response({'error':"user not found"},status=status.HTTP_404_NOT_FOUND)
    
        otp = str(random.randint(100000,999999))
        PasswordResetOTP.objects.filter(user=user).delete()
        
        PasswordResetOTP.objects.create(user=user,otp=otp)
    
        send_mail(
            'your OTP Code',
            f'use this otp to reset your password :{otp}',
            'admin@stylenest.com',
            [user.email],
        )
        
        return Response({'message': 'OTP sent to your email'}, status=200)


#  ------------ otp verification -----------
   
class OtpVerificationResetPassword(APIView):
    def post(self,request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')
            
        if not all([email,otp,new_password]):
            return Response({"error":"all fields are required"})
            
        try :
            user = user.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error':'user not found'},status=status.HTTP_400_BAD_REQUEST)
            
        try :
           otp_obj = PasswordResetOTP.objects.filter(user=user ,otp=otp).latest('created_at')
        except PasswordResetOTP.DoesNotExist:
            return Response({'error':'invalid otp'},status=status.HTTP_400_BAD_REQUEST)
            
        if otp_obj.is_expired():
            otp_obj.delete()
            return Response({'error':'otp has expired'},status=status.HTTP_400_BAD_REQUEST)
            
        user.set_password(new_password)
        user.save()
        otp_obj.delete()
            
        return Response({'message': 'Password reset successfully'}, status=200)


class ResendOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=400)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        otp = str(random.randint(100000, 999999))

        PasswordResetOTP.objects.filter(user=user).delete()
        PasswordResetOTP.objects.create(user=user, otp=otp)

        send_mail(
            'Your OTP Code (Resent)',
            f'Use this OTP to reset your password: {otp}',
            'admin@stylenest.com',
            [user.email],
        )

        return Response({'message': 'OTP resent to your email'}, status=200)
     
             

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