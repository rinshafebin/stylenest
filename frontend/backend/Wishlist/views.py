from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from Wishlist.models import Wishlist
from Wishlist.Serializer import WishlistSerializer
from products.models import Product
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404

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
        # print(request.data)
        product_id = request.data.get("product_id") or request.data.get("product.id")
        if not product_id:
            return Response({"error": "required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
        
        if not created:
            return Response({"message": "Product already in wishlist"}, status=status.HTTP_200_OK)

        serializer = WishlistSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



# ---------------- delete wishlist items -----------------

class RemoveWishlistItem(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        wishlist_item = get_object_or_404(Wishlist, product_id=pk, user=request.user)
        wishlist_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    

# -----------------------------------------------------------


