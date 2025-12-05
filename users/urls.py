from django.urls import path
from users.views import (
    UserRegistration,
    Login,
    ChangePassword,
    PasswordResetRequest,
    OTPVerificationView,
    PasswordResetView
)

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='usersignup'),  
    path('login/', Login.as_view(), name='login'),
    path('changepassword/', ChangePassword.as_view(), name='changepassword'), 

    path('forgot-password/', PasswordResetRequest.as_view(), name='forgot-password'),
    path('verify-otp/', OTPVerificationView.as_view(), name='verify-otp'),
    path('reset-password/', PasswordResetView.as_view(), name='reset-password'),
]

