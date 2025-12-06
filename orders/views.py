from decimal import Decimal
import hmac, hashlib, logging
import razorpay
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import Order, ShippingAddress
from .serializers import OrderSerializer, ShippingAddressSerializer
from cart.models import CartItem  
from django.http import JsonResponse


logger = logging.getLogger(__name__)

# ------------------- Shipping Address -------------------
class ShippingAddressListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        addresses = ShippingAddress.objects.filter(user=request.user)
        serializer = ShippingAddressSerializer(addresses, many=True)
        return Response({"status": "success", "addresses": serializer.data})

    def post(self, request):
        serializer = ShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {"status": "success", "message": "Address added successfully", "address": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response({"status": "error", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ShippingAddressDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(ShippingAddress, pk=pk, user=user)

    def get(self, request, pk):
        address = self.get_object(pk, request.user)
        serializer = ShippingAddressSerializer(address)
        return Response({"status": "success", "address": serializer.data})

    def put(self, request, pk):
        address = self.get_object(pk, request.user)
        serializer = ShippingAddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "message": "Address updated successfully", "address": serializer.data})
        return Response({"status": "error", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        address = self.get_object(pk, request.user)
        address.delete()
        return Response({"status": "success", "message": "Address deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# ------------------- Order Creation -------------------
class CreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    order = serializer.save()

                    # COD
                    if order.payment_method == "cod":
                        CartItem.objects.filter(user=request.user).delete()
                        return Response({
                            "status": "COD Order Created",
                            "order_id": order.id
                        }, status=status.HTTP_201_CREATED)

                    # Razorpay
                    elif order.payment_method == "razorpay":
                        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
                        razorpay_order = client.order.create({
                            "amount": int(order.total * 100),  # amount in paise
                            "currency": "INR",
                            "payment_capture": 1
                        })
                        order.razorpay_order_id = razorpay_order["id"]
                        order.save()
                        return Response({
                            "razorpay_order_id": razorpay_order["id"],
                            "amount": razorpay_order["amount"],
                            "currency": "INR",
                            "key": settings.RAZORPAY_KEY_ID,
                            "order_id": order.id
                        }, status=status.HTTP_201_CREATED)

            except Exception as e:
                logger.error(f"Order creation failed: {e}")
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ------------------- Razorpay Payment Verification -------------------
class VerifyPaymentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")

        if not (razorpay_order_id and razorpay_payment_id and razorpay_signature):
            return Response({"error": "Missing payment details"}, status=status.HTTP_400_BAD_REQUEST)

        # Verify signature
        key_secret = bytes(settings.RAZORPAY_KEY_SECRET, "utf-8")
        msg = f"{razorpay_order_id}|{razorpay_payment_id}".encode()
        generated_signature = hmac.new(key_secret, msg, hashlib.sha256).hexdigest()

        if generated_signature != razorpay_signature:
            return Response({"status": "Verification Failed"}, status=status.HTTP_400_BAD_REQUEST)

        order = get_object_or_404(Order, razorpay_order_id=razorpay_order_id, user=request.user)
        with transaction.atomic():
            order.payment_status = "paid"
            order.razorpay_payment_id = razorpay_payment_id
            order.save()
            CartItem.objects.filter(user=request.user).delete()

        return Response({"status": "Payment Verified"}, status=status.HTTP_200_OK)


# ------------------- User Order Views -------------------
class UserOrdersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


# ------------------- Admin Order List -------------------
class AdminOrderListAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        orders = Order.objects.all().order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)






def test_razorpay(request):
    # Create Razorpay client
    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    try:
        # Fetch a list of orders (just to check if auth works)
        orders = client.order.all()
        return JsonResponse({"status": "success", "orders": orders})
    except razorpay.errors.ServerError as e:
        return JsonResponse({"status": "error", "error": str(e)})
    except razorpay.errors.AuthenticationError as e:
        return JsonResponse({"status": "error", "error": "Authentication failed"})