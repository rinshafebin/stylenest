from rest_framework import serializers
from products.models import Product 
from cart.models import Cart

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','price','image']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    
    class Meta:
        model = Cart
        fields = ['id','product','quantity']

