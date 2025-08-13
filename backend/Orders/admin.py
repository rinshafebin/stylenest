from django.contrib import admin
from Orders.models import OrderItemSerializer,OrderItem

# Register your models here.
admin.site.register(OrderItemSerializer)
admin.site.register(OrderItem)