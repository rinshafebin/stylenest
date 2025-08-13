import razorpay
import hmac
import hashlib
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response


class VerifyPaymentView(APIView):
    def post(self, request):
        razorpay_order_id = request.data.get('razorpay_order_id')
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        razorpay_signature = request.data.get('razorpay_signature')

        if not all([razorpay_order_id, razorpay_payment_id, razorpay_signature]):
            return Response({"status": "Missing parameters"}, status=400)

        key_secret = bytes(settings.RAZORPAY_SECRET_KEY, 'utf-8')
        msg = f"{razorpay_order_id}|{razorpay_payment_id}".encode()
        generated_signature = hmac.new(key_secret, msg, hashlib.sha256).hexdigest()

        if generated_signature == razorpay_signature:
            return Response({"status": "Payment Verified"})
        else:
            return Response({"status": "Verification Failed"}, status=400)


class CreateOrderView(APIView):
    def post(self, request):
        try:
            amount = request.data.get("amount")
            if not amount:
                return Response({"error": "Amount is required"}, status=400)

            print("Received amount:", amount)

            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET_KEY))

            order = client.order.create({
                "amount": int(amount) * 100,  # Razorpay expects amount in paise
                "currency": "INR",
                "payment_capture": "1"
            })

            return Response({
                "id": order["id"],
                "amount": order["amount"],
                "currency": order["currency"],
                "key": settings.RAZORPAY_KEY_ID
            })
        except Exception as e:
            print("ERROR:", str(e))
            return Response({"error": str(e)}, status=500)
