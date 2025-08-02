from rest_framework import serializers
from Products.models import Product 
from Cart.models import CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','price','image']

class CartItemSerializer(serializers.Serializer):
    product = ProductSerializer(read_only = True)
    
    class Meta:
        model = CartItem
        fields = ['id','product','quantity']

