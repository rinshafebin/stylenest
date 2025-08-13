# orders/serializers.py
from rest_framework import serializers
from Orders.models import Order, OrderItem
from Products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price"]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "address", "total", "status", "created_at", "items"]
        read_only_fields = ["user", "status", "created_at"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user
        order = Order.objects.create(user=user, **validated_data)
        for item in items_data:
            product = Product.objects.get(id=item["product"].id)
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item["quantity"],
                price=item["price"]
            )
        return order
