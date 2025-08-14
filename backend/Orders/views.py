from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from Orders.serializers import ShippingAddressSerializer
from Orders.models import ShippingAddress

class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def format_errors(self, errors):
        formatted = {}
        for field, messages in errors.items():
            if isinstance(messages, list) and messages:
                formatted[field] = messages[0] 
            else:
                formatted[field] = str(messages)
        return {"errors": formatted}

    def get(self, request):
        try:
            address = request.user.shipping_address
            serializer = ShippingAddressSerializer(address)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)

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

    def delete(self, request):
        try:
            address = request.user.shipping_address
            address.delete()
            return Response({"detail": "Shipping address deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)
