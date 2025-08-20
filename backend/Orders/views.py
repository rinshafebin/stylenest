import hmac, hashlib
from decimal import Decimal
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from Orders.serializers import ShippingAddressSerializer,OrderSerializer
from Orders.models import ShippingAddress, Order
from cart.models import Cart 
from products.serializers import ProductSerializer
logger = logging.getLogger(__name__)


# -------- Order Summary --------
class OrderSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = Cart.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({"detail": "Your cart is empty"}, status=400)

        try:
            shipping_address = request.user.shipping_address
            shipping_data = ShippingAddressSerializer(shipping_address).data
        except ShippingAddress.DoesNotExist:
            shipping_data = None

        items_data = []
        subtotal = Decimal("0.00")

        for item in cart_items:
            product_data = ProductSerializer(item.product, context={"request": request}).data
            item_subtotal = Decimal(str(item.product.price)) * item.quantity
            subtotal += item_subtotal
            items_data.append({
                "product": product_data,
                "quantity": item.quantity,
                "subtotal": item_subtotal
            })

        shipping_cost = Decimal("50.00") if subtotal < Decimal("500.00") else Decimal("0.00")
        total_price = subtotal + shipping_cost

        return Response({
            "shipping_address": shipping_data,
            "items": items_data,
            "subtotal": subtotal,
            "shipping": shipping_cost,
            "total_price": total_price
        })



# -------- Shipping Address (GET / POST / PATCH) --------

class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def format_errors(self, errors):
        formatted = {}
        for field, messages in errors.items():
            formatted[field] = messages[0] if isinstance(messages, list) and messages else str(messages)
        return {"errors": formatted}

    def get(self, request):
        try:
            address = request.user.shipping_address
            serializer = ShippingAddressSerializer(address)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if hasattr(request.user, "shipping_address"):
            return Response({"detail": "Address already exists. Use PATCH to update."}, status=400)
        serializer = ShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(self.format_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        try:
            address = request.user.shipping_address
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShippingAddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(self.format_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)



class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
            if order.status in ['Processing', 'Pending']:
                order.status = 'Cancelled'
                order.save()
                return Response({"detail": "Order cancelled"})
            return Response({"detail": "Order cannot be cancelled"}, status=400)
        except Order.DoesNotExist:
            return Response({"detail": "Not found"}, status=404)
    
