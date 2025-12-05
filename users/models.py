from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from datetime import timedelta
import random

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, db_index=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True, db_index=True)
    address = models.TextField(blank=True, null=True)

    otp = models.IntegerField(blank=True, null=True, db_index=True)
    otp_expiration = models.DateTimeField(blank=True, null=True)
    otp_verified = models.BooleanField(default=False, db_index=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def otp_generate(self):
        self.otp = random.randint(100000, 999999)
        self.otp_expiration = timezone.now() + timedelta(minutes=5)
        self.otp_verified = False
        self.save()

    class Meta:
        indexes = [
            models.Index(fields=['otp', 'otp_expiration']), 
        ]
