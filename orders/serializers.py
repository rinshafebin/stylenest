from rest_framework import serializers
from decimal import Decimal
from .models import Order, OrderItem, ShippingAddress
from cart.models import CartItem


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = [
            "id", "user", "address_line1", "address_line2", "city",
            "state", "country", "zip_code", "phone_number", "is_default",
            "created_at", "updated_at",
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate(self, data):
        required_fields = ['address_line1', 'city', 'state', 'country', 'zip_code', 'phone_number']
        errors = {}
        for field in required_fields:
            if not data.get(field):
                errors[field] = f"{field.replace('_', ' ').title()} is required."
        if errors:
            raise serializers.ValidationError(errors)
        return data


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']
        read_only_fields = ['id', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = serializers.PrimaryKeyRelatedField(queryset=ShippingAddress.objects.all())

    class Meta:
        model = Order
        fields = ['id', 'user', 'shipping_address', 'total', 'payment_method',
                  'payment_status', 'items', 'created_at', 'razorpay_order_id', 'razorpay_payment_id']
        read_only_fields = ['id', 'user', 'total', 'payment_status', 'created_at',
                            'razorpay_order_id', 'razorpay_payment_id']

    def validate_shipping_address(self, value):
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError("This shipping address does not belong to you.")
        return value

    def create(self, validated_data):

        user = self.context['request'].user
        shipping_address = validated_data.pop('shipping_address')

        # Get cart items
        cart_items = CartItem.objects.filter(user=user)
        if not cart_items.exists():
            raise serializers.ValidationError("Cart is empty.")

        # Calculate total
        total_amount = sum([item.product.price * item.quantity for item in cart_items])

        # Create order
        order = Order.objects.create(
            user=user,
            shipping_address=shipping_address,
            total=Decimal(total_amount),
            payment_method=validated_data.get('payment_method'),
            payment_status='pending'
        )

        # Create order items
        order_items = [
            OrderItem(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
            for item in cart_items
        ]
        OrderItem.objects.bulk_create(order_items)

        return order
