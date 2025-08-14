from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from user.serializers import UserProfileSerializer,ShippingAddressSerializer
from user.models import ShippingAddress


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

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
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            address = request.user.shipping_address
            address.delete()
            return Response({"detail": "Shipping address deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "No shipping address found"}, status=status.HTTP_404_NOT_FOUND)
