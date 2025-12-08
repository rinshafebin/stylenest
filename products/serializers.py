from rest_framework import serializers
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category = serializers.ChoiceField(choices=Product.CATEGORY_CHOICES)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'slug']

    # Return full Cloudinary URL
    def get_image(self, obj):
        if obj.image:
            try:
                return obj.image.url
            except ValueError:
                return None
        return None

    # Validations
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
