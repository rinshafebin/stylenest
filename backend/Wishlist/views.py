from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from Wishlist.models import Wishlist
from Wishlist.Serializer import WishlistSerializer
from Products.models import Product
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# ----------------- get wishlist items -------------------------

class WishListApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        wishlist_items = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlist_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# ------------------- create wishlist item --------------------


class CreateWishlistItems(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        print(request)
        product_id = request.data.get('product')
        if not product_id:
            return Response({"detail": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        
        wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
        
        if not created:
            return Response({"detail": "Product already in wishlist."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = WishlistSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


# ---------------- delete wishlist items -----------------

class RemoveWishlistItem(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request,pk):
        wishlist_id = pk
        try:
            wishlist_item = Wishlist.objects.get(id=wishlist_id,user =request.user)
        except Wishlist.DoesNotExist:
            return Response({"detail": "Wishlist item not found."}, status=status.HTTP_404_NOT_FOUND)
        wishlist_item.delete()
        return Response(status=status.HTTP_200_OK)
    

# -----------------------------------------------------------


