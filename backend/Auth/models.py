from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta
from django.utils import timezone


# Create your models here.

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)  
    address = models.TextField(blank=True, null=True)  

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['first_name','last_name','username',]
    
    def __str__(self):
        return self.email
    

class PasswordResetOTP(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_expired(self):
        return timezone.now()>self.created_at + timedelta(minutes=10)