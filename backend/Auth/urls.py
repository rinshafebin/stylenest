from django.urls import path
from Auth.views import (
    UserRegistration,
    Login,
    ChangePassword,
    ForgotPasswordAPIView,
    VerifyOTPAPIView,
    ResetPasswordAPIView
)

urlpatterns = [
    path('register/',UserRegistration.as_view(),name='usersignup'),  
    path('login/',Login.as_view(),name='login'),
    path('changepassword/',ChangePassword.as_view(),name='changepassword'), 
     path('forgot-password/', ForgotPasswordAPIView.as_view()),
    path('verify-otp/', VerifyOTPAPIView.as_view()),
    path('reset-password/', ResetPasswordAPIView.as_view()),

    
]
