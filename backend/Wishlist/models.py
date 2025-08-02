from django.db import models
from Auth.models import CustomUser
from Products.models import Product

# Create your models here.
class WishList(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE)

class WishListItem(models.Model):
    wishlist = models.ForeignKey(WishList,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
