from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import CartItem,WishlistItem
from .serializers import CartItemSerializer, AddToCartSerializer,WishlistItemSerializer
from products.models import Product

# ---------------- Add to Cart ----------------
class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            product = get_object_or_404(Product, id=serializer.validated_data['product_id'])
            quantity = serializer.validated_data.get('quantity', 1)

            if quantity > product.stock:
                return Response({'error': 'Quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)

            cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product)
            if not created:
                if cart_item.quantity + quantity > product.stock:
                    return Response({'error': 'Total quantity exceeds stock'}, status=status.HTTP_400_BAD_REQUEST)
                cart_item.quantity += quantity
            else:
                cart_item.quantity = quantity
            cart_item.save()

            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ---------------- List Cart Items ----------------
class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)

        # Calculate total cart price
        total_cart_price = sum([item.total_price for item in cart_items])
        return Response({
            'cart_items': serializer.data,
            'total_cart_price': total_cart_price
        }, status=status.HTTP_200_OK)

# ---------------- Update Cart Item ----------------
class UpdateCartItemView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def patch(self, request, pk):
        cart_item = get_object_or_404(CartItem, pk=pk, user=request.user)
        quantity = request.data.get('quantity')
        is_selected = request.data.get('is_selected')

        if quantity is not None:
            quantity = int(quantity)
            if quantity < 1:
                return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)
            if quantity > cart_item.product.stock:
                return Response({'error': 'Quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity = quantity

        if is_selected is not None:
            cart_item.is_selected = bool(is_selected)

        cart_item.save()
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)

# ---------------- Remove Cart Item ----------------
class RemoveCartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        cart_item = get_object_or_404(CartItem, pk=pk, user=request.user)
        cart_item.delete()
        return Response({'detail': 'Cart item removed'}, status=status.HTTP_204_NO_CONTENT)




class WishlistListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist_items = WishlistItem.objects.filter(user=request.user)
        serializer = WishlistItemSerializer(wishlist_items, many=True)
        return Response({"wishlist": serializer.data})
    
class WishlistAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        wishlist_item, created = WishlistItem.objects.get_or_create(user=request.user, product=product)
        if not created:
            return Response({"message": "Product already in wishlist"})
        
        serializer = WishlistItemSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class WishlistDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        try:
            wishlist_item = WishlistItem.objects.get(id=item_id, user=request.user)
            wishlist_item.delete()
            return Response({"message": "Product removed from wishlist"})
        except WishlistItem.DoesNotExist:
            return Response({"error": "Product not in wishlist"}, status=status.HTTP_404_NOT_FOUND)