from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import UserProfileSerializer,UserAddressSerializer
from .models import UserAddress


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


class EditProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class UserAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        address = UserAddress.objects.filter(user=request.user).first()
        if not address:
            return Response({"message": "No address found"}, status=status.HTTP_204_NO_CONTENT)
        serializer = UserAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        existing_address = UserAddress.objects.filter(user=request.user).first()
        if existing_address:
            return Response({"error": "Address already exists, use PUT to update."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserAddressSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
    def put(self, request):
        address = UserAddress.objects.filter(user=request.user).first()
        if not address:
            return Response({"error": "No address found to update"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserAddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

