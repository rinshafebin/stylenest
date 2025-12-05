from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from products.serializers import ProductSerializer
from rest_framework.response import Response 
from products.models import Product
from rest_framework import status
from django.db.models import Q
# Create your views here.


# ---------------------- search products api ---------------------------

class Search_products(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('search', '')
        
        if query:
            products = Product.objects.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )
        else:
            products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# ---------------------- all products  api ---------------------------

class Products(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        products = Product.objects.all()
        if products.exists():
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'No products found'}, status=status.HTTP_204_NO_CONTENT)




# ----------------------product details  api ---------------------------


class ProductDetails(APIView):
    permission_classes = [AllowAny]

    def get(self,request,pk):
        print("hello")
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data,status=status.HTTP_200_OK)



# ---------------------- products viewing by category  --------------

class ViewProductsByCategory(APIView):
    permission_classes = [AllowAny]
     
    def get(self, request, category):
        try:
            products = Product.objects.filter(category=category)
            if products.exists():
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)          
            return Response({'detail': 'no product found for this category'}, status=status.HTTP_204_NO_CONTENT)
        
        except:
            return Response({'detail': 'error fetching products by category'}, status=status.HTTP_400_BAD_REQUEST)
               


# ------------------------------------------------------------------------