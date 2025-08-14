from django.contrib import admin
from Orders.models import OrderItem,Order,ShippingAddress

# Register your models here.
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(ShippingAddress)