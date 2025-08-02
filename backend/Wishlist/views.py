from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from wishlist.models import WishlistItem
from Products.models import Product
from .serializers import WishlistItemSerializer

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist = WishlistItem.objects.filter(user=request.user)
        serializer = WishlistItemSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product_id")
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=404)

        item, created = WishlistItem.objects.get_or_create(user=request.user, product=product)
        if not created:
            return Response({"message": "Product already in wishlist."}, status=400)

        return Response({"message": "Product added to wishlist."}, status=201)

    def delete(self, request):
        product_id = request.data.get("product_id")
        try:
            item = WishlistItem.objects.get(user=request.user, product_id=product_id)
            item.delete()
            return Response({"message": "Removed from wishlist."}, status=200)
        except WishlistItem.DoesNotExist:
            return Response({"error": "Item not found."}, status=404)
