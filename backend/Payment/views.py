from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from payments.razorpay_client import client
# Create your views here.
class RazoPayCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        amount = request.data.get('amount')
        
        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)
        amount_paise = int(float(amount*100))
        
        razorpay_order = client.order.create(dict(amount=amount_paise,currency='INR',payment_capture='1'))
        return Response(razorpay_order)

        
