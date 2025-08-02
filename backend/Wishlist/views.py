from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from Cart.models import WishList,WishListItem
from Cart.serializers import AddToWishlistSerializer
from Products.models import Product

# Create your views here.
class AddToWishView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        serializer = AddToWishlistSerializer(data = request.data)
        if serializer.is_valid():
            user =request.user
            product_id = serializer.validated_data['product_id']
            product = Product.objects.get(id = product_id)
            
            wishlist , created = WishList.objects.get_or_create(user=user)
            item ,created = WishListItem.objects.get_or_create(wishlist=wishlist,product=product)
            
            if not created :
                return Response({"message": "Product already in wishlist "}, status=status.HTTP_200_OK)            
            return Response({"message": "Product added to wishlist."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
 
            
            

