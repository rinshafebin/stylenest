# from django.db import models
# from django.conf import settings
# from Products.models import Product

# # Each user has exactly one shipping address
# class UserAddress(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     phone_number = models.CharField(max_length=15)
#     pincode = models.CharField(max_length=10)
#     state = models.CharField(max_length=100)
#     city = models.CharField(max_length=100)
#     address_line = models.TextField()

#     def __str__(self):
#         return f"{self.name} - {self.city}"
    

# class Order(models.Model):
#     STATUS = [("PENDING","PENDING"), ("PAID","PAID"), ("FAILED","FAILED")]
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
#     shipping_address = models.ForeignKey(UserAddress, on_delete=models.PROTECT)
#     total_amount = models.PositiveIntegerField()
#     currency = models.CharField(max_length=10, default="INR")
#     status = models.CharField(max_length=10, choices=STATUS, default="PENDING")
#     razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
#     razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
#     razorpay_signature = models.CharField(max_length=200, blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)