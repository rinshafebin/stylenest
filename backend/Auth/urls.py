from django.urls import path
from Auth.views import (
    UserRegistration,
    Login,
    ChangePassword,
    ResetPasswordOTP,
    OtpVerificationResetPassword,
    ResendOTPView
)

urlpatterns = [
    path('register/',UserRegistration.as_view(),name='usersignup'),  
    path('login/',Login.as_view(),name='login'),
    path('changepassword/',ChangePassword.as_view(),name='changepassword'), 
    # path('logout/',Logout.as_view(),name='logout') ,
    path('send-otp/',ResetPasswordOTP.as_view(),name='ResetPasswordOTP'),
    path('OtpVerification/',OtpVerificationResetPassword.as_view(),name='OtpVerificationResetPassword'),
    path('resend-otp/', ResendOTPView.as_view(), name='resend-otp'),

    
]
