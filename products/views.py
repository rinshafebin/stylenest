from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db.models import Q
from django.shortcuts import get_object_or_404
from users.pagination import StandardResultsSetPagination

from products.models import Product
from products.serializers import ProductSerializer
from django.db import IntegrityError



# ------------------------- Pagination -------------------------
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


# ------------------------- PUBLIC APIs -------------------------
class Products(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        products = Product.objects.all().order_by('-created_at')

        # Search query
        search_query = request.query_params.get('q')
        if search_query:
            products = products.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )

        # Category filter (men, women, kids)
        category = request.query_params.get('category')
        if category:
            # Convert to lowercase for case-insensitive match
            category = category.lower()
            if category in ['men', 'women', 'kids']:
                products = products.filter(category__iexact=category)
            else:
                return Response(
                    {"error": "Invalid category. Allowed: men, women, kids"},
                    status=400
                )

        # Pagination
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ProductDetails(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)


class ViewProductsByCategory(APIView):
    permission_classes = [AllowAny]

    def get(self, request, category):
        products = Product.objects.filter(category=category.lower())
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class SearchProducts(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get('q')
        if not query:
            return Response({"error": "Search query not provided"}, status=status.HTTP_400_BAD_REQUEST)

        products = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# ------------------------- ADMIN CRUD APIs -------------------------

class AllProducts(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        products = Product.objects.all().order_by('-created_at')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateProduct(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request):
        print("REQUEST DATA:", request.data)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdate(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def patch(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            updated_product = serializer.save()
            return Response(ProductSerializer(updated_product).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def get(self, request, pk):
            product = get_object_or_404(Product, pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)



class ProductDelete(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)

            product.delete()

            return Response(
                {"detail": "Product deleted successfully."},
                status=status.HTTP_204_NO_CONTENT
            )

        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."},
                status=status.HTTP_404_NOT_FOUND
            )
