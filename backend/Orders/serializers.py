from rest_framework import serializers
from Orders.models import Order, OrderItem, ShippingAddress
from Products.models import Product  


# ------------------ order serializers -------------------------------------

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderItem
        fields = ["product", "quantity"]

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    shipping_address = serializers.PrimaryKeyRelatedField(queryset=ShippingAddress.objects.all(), write_only=True)

    class Meta:
        model = Order
        fields = ["shipping_address", "items"]

    def validate(self, data):
        if not data.get("items"):
            raise serializers.ValidationError({"items": "Order must have at least one item."})
        return data

    def create(self, validated_data):
        user = self.context["request"].user
        shipping_address = validated_data.pop("shipping_address")
        items_data = validated_data.pop("items")

        total = 0
        for item in items_data:
            total += item["product"].price * item["quantity"]

        order = Order.objects.create(
            user=user,
            address=shipping_address,
            total=total
        )

        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product=item["product"],
                quantity=item["quantity"],
                price=item["product"].price
            )

        return order


# ------------------ shipping address serializers -------------------------------------


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"
        read_only_fields = ["user"]
        extra_kwargs = {
            "name": 
                { "required": True, "error_messages": { "required": "Please enter the recipient's name","blank": "Name cannot be empty" }
            },
            "phone": 
                { "required": True, "error_messages": { "required": "Please provide a phone number","blank": "Phone number cannot be empty" }
            },
            "address": 
                {"required": True, "error_messages": { "required": "Please enter your shipping address", "blank": "Address cannot be empty" }
            },
            "city": 
                { "required": True, "error_messages": { "required": "Please enter your city", "blank": "City cannot be empty" }
            },
            "state": 
                { "required": True, "error_messages": { "required": "Please enter your state", "blank": "State cannot be empty"}
            },
            "pincode": 
                { "required": True, "error_messages": { "required": "Please enter your pincode", "blank": "Pincode cannot be empty"}
            },
            "country": 
                { "required": True, "error_messages": { "required": "Please enter your country", "blank": "Country cannot be empty" }
            }
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

# ------------------ --------------------- -------------------------------------

