from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from Orders.serializers import ShippingAddressSerializer,OrderCreateSerializer
from Orders.models import ShippingAddress


# ------------------ order view -------------------------------------


class PaidOrderCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            order = serializer.save(status="Paid")  
            return Response({
                "message": "Order created and payment confirmed.",
                "order_id": order.id,
                "total": order.total
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ------------------ shipping address view -------------------------------------

class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

    # ------ address errors -----

    def format_errors(self, errors):
        formatted = {}
        for field, messages in errors.items():
            if isinstance(messages, list) and messages:
                formatted[field] = messages[0] 
            else:
                formatted[field] = str(messages)
        return {"errors": formatted}


    # ------ gettign the user address  -----

    def get(self, request):
        try:
            address = request.user.shipping_address
            serializer = ShippingAddressSerializer(address)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)


    # ------ address create -----

    def post(self, request):
        try:
            address = request.user.shipping_address
            serializer = ShippingAddressSerializer(address, data=request.data)
        except ShippingAddress.DoesNotExist:
            serializer = ShippingAddressSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(self.format_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    
    # ------ address update -----

    def patch(self, request):
        try:
            address = request.user.shipping_address
            serializer = ShippingAddressSerializer(address, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(self.format_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)



# ------------------ -------------- -------------------------------------
# Orders/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Orders.serializers import ShippingAddressSerializer
from Cart.models import Cart
from Products.serializers import ProductSerializer

class OrderSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = Cart.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response({"detail": "Your cart is empty"}, status=400)

        try:
            shipping_address = request.user.shipping_address
            shipping_data = ShippingAddressSerializer(shipping_address).data
        except:
            shipping_data = None

        items_data = []
        total_price = 0

        for item in cart_items:
            product_data = ProductSerializer(item.product).data
            subtotal = item.product.price * item.quantity
            total_price += subtotal
            items_data.append({
                "product": product_data,
                "quantity": item.quantity,
                "subtotal": subtotal
            })

        return Response({
            "shipping_address": shipping_data,
            "items": items_data,
            "total": total_price
        })
