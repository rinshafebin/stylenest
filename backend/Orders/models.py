from django.db import models
from django.conf import settings
from Products.models import Product

# Create your models here.
class ShippingAddress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    full_name = models.CharField(max_length=20)
    phone = models.CharField(max_length=10)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    postal_code = models.IntegerField()
    
    def __str__(self):
        return self.full_name
    

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending','Pending'),
        ('processing' , 'Processing'),
        ('shipped' , 'Shipped'),
        ('delivered' , 'Delivered')
    )    
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete = models.CASCADE)
    shipping_address= models.ForeignKey(ShippingAddress,on_delete= models.PROTECT)
    total_price = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(max_length=10 ,choices=STATUS_CHOICES,default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"order by {self.user.username}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"