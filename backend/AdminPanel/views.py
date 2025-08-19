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


# --------------------------------------- user apis for viewing ------------------------------------------

class ViewAllUsers(APIView):
    permission_classes = [IsAdminUser]
      
    def get(self,request):
        print(request.data)
        users = CustomUser.objects.filter(is_superuser=False)
        serializer = ViewAllUsersSerializer(users,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
    
class UserDetail(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request,pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = ViewAllUsersSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)
      
    

# ---------------------------------- product apis for CRUD ----------------------------------------------#


class AllProducts(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
# class CreateProduct(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         print(request.data)
#         serializer = ProductSerializer(data=request.data)

#         if serializer.is_valid():
#             validated_data = serializer.validated_data

#             # Handle image upload
#             image_file = request.FILES.get('image')
#             image_url = None
#             if image_file:
#                 # generate a safe filename (optional)
#                 image_name = image_file.name
#                 image_url = upload_image_to_s3(image_file, image_name)

#             # Save product
#             product = Product.objects.create(
#                 name=validated_data['name'],
#                 description=validated_data['description'],
#                 price=validated_data['price'],
#                 category=validated_data['category'],
#                 stock=validated_data.get('stock', 0),
#                 image=image_url,   # <-- store the S3 URL instead of raw file
#             )

#             response_serializer = ProductSerializer(product)
#             return Response(response_serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 
        
class CreateProduct(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()  # ✅ this automatically uploads `image` to S3
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
# ----------------------------- crud product --------------------------------

class ProductDetails(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def get(self,request,pk):
        print(request.data)
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data,status=status.HTTP_200_OK)


# class ProductUpdate(APIView):
#     permission_classes = [IsAdminUser]

#     def patch(self, request, pk):
#         try:
#             product = Product.objects.get(pk=pk)
#             serializer = ProductSerializer(product, data=request.data, partial=True)

#             if serializer.is_valid():
#                 validated_data = serializer.validated_data

#                 # 🔹 Handle new image upload if present
#                 image_file = request.FILES.get('image')
#                 if image_file:
#                     image_name = image_file.name
#                     image_url = upload_image_to_s3(image_file, image_name)
#                     validated_data['image'] = image_url   # overwrite with S3 URL

#                 # 🔹 Update product with validated data
#                 Product.objects.filter(pk=pk).update(**validated_data)

#                 # Reload updated product
#                 updated_product = Product.objects.get(pk=pk)
#                 response_serializer = ProductSerializer(updated_product)

#                 return Response(response_serializer.data, status=status.HTTP_200_OK)

#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         except Product.DoesNotExist:
#             return Response({'detail': 'Error updating product'}, status=status.HTTP_404_NOT_FOUND)






class ProductUpdate(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            updated_product = serializer.save() 
            return Response(ProductSerializer(updated_product).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProductDelete(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response({'detail': 'product deleted succesfully'}, status=status.HTTP_204_NO_CONTENT)
        
        except:    
            return Response({'detail': 'error deleting the product'},status=status.HTTP_404_NOT_FOUND)
        
        
    
# ---------------------------- products viewing by category  --------------------------


class ViewProductsByCategory(APIView):
    permission_classes = [IsAdminUser]     
    
    def get(self, request, category):
        try:
            products = Product.objects.filter(category=category)
            if products.exists():
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)          
            return Response({'detail': 'no product found for this category'}, status=status.HTTP_204_NO_CONTENT)
        
        except:
            return Response({'detail': 'error fetching products by category'}, status=status.HTTP_400_BAD_REQUEST)
               

# ----------------------------    all orders  --------------------------

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

