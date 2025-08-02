from rest_framework import serializers
from Products.models import Product 

class AddToWishlistSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    
    def validate_product_id(self,value):
        if not Product.objects.filter(id=value).exists():
            raise serializers.ValidationError("product not found")
        return value
    
