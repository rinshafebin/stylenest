from rest_framework import serializers
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source="image_url", required=False)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'details', 'price',
            'category', 'stock', 'image', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'slug']

    def validate_name(self, value):
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError("Product name must have at least 3 characters.")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be positive.")
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative.")
        return value

    def validate_image(self, value):
        if value and not value.startswith("http"):
            raise serializers.ValidationError("Image must be a valid URL.")
        return value
