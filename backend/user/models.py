from django.db import models
from django.conf import settings

class UserAddress(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nameofuser = models.CharField(max_length=100)
    phonenumber = models.BigIntegerField()
    pincode = models.IntegerField()
    state = models.CharField(max_length=100)
    address= models.TextField()

    def __str__(self):
        return f"{self.nameofuser} - {self.pincode}"
