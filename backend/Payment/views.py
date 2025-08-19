from decimal import Decimal
import hmac, hashlib, logging
import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from Orders.models import Order
from cart.models import Cart

logger = logging.getLogger(__name__)

class CreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payment_method = request.data.get("payment_method")
        amount = request.data.get("amount")

        if payment_method not in ["cod", "razorpay"]:
            return Response({"error": "Invalid payment method"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = int(amount)
            if amount <= 0:
                return Response({"error": "Amount must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "Amount must be a valid number"}, status=status.HTTP_400_BAD_REQUEST)

        cart_items = Cart.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        if payment_method == "cod":
            order = Order.objects.create(
                user=request.user,
                total=Decimal(amount),
                payment_method="cod",
                payment_status="pending"
            )
            for item in cart_items:
                order.items.create(
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )
            cart_items.delete()
            return Response({"status": "COD Order Created", "order_id": order.id}, status=status.HTTP_201_CREATED)

        elif payment_method == "razorpay":
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            razorpay_order = client.order.create({
                "amount": amount * 100,
                "currency": "INR",
                "payment_capture": 1
            })
            order = Order.objects.create(
                user=request.user,
                total=Decimal(amount),
                payment_method="razorpay",
                payment_status="pending",
                razorpay_order_id=razorpay_order["id"]
            )
            return Response({
                "id": razorpay_order["id"],
                "amount": razorpay_order["amount"],
                "currency": razorpay_order["currency"],
                "key": settings.RAZORPAY_KEY_ID,
                "local_order_id": order.id
            }, status=status.HTTP_201_CREATED)




class VerifyPaymentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")

        if not (razorpay_order_id and razorpay_payment_id and razorpay_signature):
            return Response({"error": "Missing payment details"}, status=status.HTTP_400_BAD_REQUEST)

        key_secret = bytes(settings.RAZORPAY_KEY_SECRET, "utf-8")
        msg = f"{razorpay_order_id}|{razorpay_payment_id}".encode()
        generated_signature = hmac.new(key_secret, msg, hashlib.sha256).hexdigest()

        if generated_signature == razorpay_signature:
            order = Order.objects.filter(razorpay_order_id=razorpay_order_id, user=request.user).first()
            if not order:
                return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
            order.payment_status = "paid"
            order.razorpay_payment_id = razorpay_payment_id
            order.save()
            Cart.objects.filter(user=request.user).delete()
            return Response({"status": "Payment Verified"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "Verification Failed"}, status=status.HTTP_400_BAD_REQUEST)
