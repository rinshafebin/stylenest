import hmac
import hashlib
import logging
from decimal import Decimal

import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from Orders.models import Order

logger = logging.getLogger(__name__)


class CreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            try:
                amount = int(request.data.get("amount"))
                if amount <= 0:
                    return Response({"error": "Amount must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)
            except (ValueError, TypeError):
                return Response({"error": "Amount must be a valid number"}, status=status.HTTP_400_BAD_REQUEST)

            # Razorpay client
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

            # Create order in Razorpay
            razorpay_order = client.order.create({
                "amount": amount * 100,  # convert to paise
                "currency": "INR",
                "payment_capture": "1"
            })

            order_obj = Order.objects.create(
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
                "local_order_id": order_obj.id
            }, status=status.HTTP_201_CREATED)

        except razorpay.errors.BadRequestError as e:
            logger.error(f"Razorpay BadRequestError: {e}")
            return Response({"error": "Invalid request to Razorpay"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception("Error creating Razorpay order")
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyPaymentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            razorpay_order_id = request.data.get("razorpay_order_id")
            razorpay_payment_id = request.data.get("razorpay_payment_id")
            razorpay_signature = request.data.get("razorpay_signature")

            if not (razorpay_order_id and razorpay_payment_id and razorpay_signature):
                return Response({"error": "Missing payment details"}, status=status.HTTP_400_BAD_REQUEST)

            # Generate signature
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

                return Response({"status": "Payment Verified"}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "Verification Failed"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.exception("Error verifying payment")
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
