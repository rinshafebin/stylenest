# orders/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from user.models import UserAddress
from Products.models import Product
from django.db import transaction

class CreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_items = request.data.get("cart_items", [])
        if not cart_items:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            address = UserAddress.objects.get(user=request.user)
        except UserAddress.DoesNotExist:
            return Response({"error": "No shipping address found"}, status=status.HTTP_400_BAD_REQUEST)

        total = sum(item["price"] * item["quantity"] for item in cart_items)

        with transaction.atomic():
            order = Order.objects.create(user=request.user, address=address, total=total, status="Pending")

            for item in cart_items:
                try:
                    product = Product.objects.get(id=item["product_id"])
                except Product.DoesNotExist:
                    return Response({"error": f"Product {item['product_id']} not found"}, status=status.HTTP_400_BAD_REQUEST)

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item["quantity"],
                    price=item["price"]
                )

        return Response(
            {
                "order_id": order.id,
                "total": total,
                "items": cart_items,
                "address": {
                    "name": address.nameofuser,
                    "phone": address.phonenumber,
                    "pincode": address.pincode,
                    "state": address.state,
                    "address_line": address.address,
                }
            },
            status=status.HTTP_201_CREATED
        )
