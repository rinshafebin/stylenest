from rest_framework import serializers
from Orders.models import ShippingAddress,Order, OrderItem
from products.models import Product


# ------------------ Order Item Serializer -------------------------------------

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderItem
        fields = ["product", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id','created_at', 'total', 'payment_method',
            'payment_status', 'status', 'items'
        ]

# ------------------ Shipping Address Serializer -------------------------------------
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"
        read_only_fields = ["user"]
        extra_kwargs = {
            "name": {
                "required": True,
                "error_messages": {
                    "required": "Please enter the recipient's name",
                    "blank": "Name cannot be empty",
                },
            },
            "phone": {
                "required": True,
                "error_messages": {
                    "required": "Please provide a phone number",
                    "blank": "Phone number cannot be empty",
                },
            },
            "address": {
                "required": True,
                "error_messages": {
                    "required": "Please enter your shipping address",
                    "blank": "Address cannot be empty",
                },
            },
            "city": {
                "required": True,
                "error_messages": {
                    "required": "Please enter your city",
                    "blank": "City cannot be empty",
                },
            },
            "state": {
                "required": True,
                "error_messages": {
                    "required": "Please enter your state",
                    "blank": "State cannot be empty",
                },
            },
            "pincode": {
                "required": True,
                "error_messages": {
                    "required": "Please enter your pincode",
                    "blank": "Pincode cannot be empty",
                },
            },
            "country": {
                "required": True,
                "error_messages": {
                    "required": "Please enter your country",
                    "blank": "Country cannot be empty",
                },
            },
        }

    def validate_phone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits")
        if len(value) < 10:
            raise serializers.ValidationError("Phone number must be at least 10 digits long")
        return value

    def validate_pincode(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Pincode must contain only digits")
        if len(value) != 6:
            raise serializers.ValidationError("Pincode must be exactly 6 digits")
        return value
