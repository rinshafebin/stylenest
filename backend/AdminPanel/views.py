from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from products.serializers import ProductSerializer
from AdminPanel.serializers import ViewAllUsersSerializer
from rest_framework.response import Response 
from products.models import Product
from Auth.models import CustomUser
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from Orders.models import Order
from AdminPanel.serializers import OrderSerializer
from rest_framework.generics import UpdateAPIView
from products.utils import upload_image_to_s3

# Create your views here.





class AllOrders(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        orders = Order.objects.all().order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AdminOrderUpdateView(UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

