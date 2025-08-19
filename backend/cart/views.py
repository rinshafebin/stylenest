from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from cart.models import Cart
from cart.serializers import CartItemSerializer
from products.models import Product


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    
    # --------- create new cart  item -----------
    
    def post(self,request):
        # print("🔐 Backend received Authorization:", request.META.get('HTTP_AUTHORIZATION'))

        product_id =request.data.get("product_id")
        quantity = int(request.data.get("quantity",1))
        
        if quantity <= 0:
            return Response({"error": "Quantity must be greater than zero"}, status=400)
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        cart_item,created = Cart.objects.get_or_create(
            user = request.user,
            product = product,
            defaults = {"quantity":quantity}
        )   
        if not created:
            cart_item.quantity +=quantity
            cart_item.save()
            
        serializer = CartItemSerializer(cart_item) 
        return Response({"message": "Item added to cart", "cart_item": serializer.data}, status=status.HTTP_201_CREATED)


# ---------------  cart list -----------------------

class CartListView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        cart_items = Cart.objects.filter(user = request.user)
        serializer = CartItemSerializer(cart_items,many=True)
        return Response(serializer.data)
    

 # ------------------ update cart  item --------------

class UpdateCartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self,request,pk):
        try:
            cart_item = Cart.objects.get(pk=pk,user=request.user)
        except Cart.DoesNotExist:           
            return Response({"error": "Item not found"}, status=404)
        
        quantity = int(request.data.get("quantity",1))
        
        if quantity <= 0:  
            return Response({"error": "Quantity must be greater than zero"}, status=400)
        
        cart_item.quantity = quantity
        cart_item.save()
        
        serializer = CartItemSerializer(cart_item)
        return Response({"message": "Cart item updated", "updated_item": serializer.data})


# -------------- remove cart  item ----------------------

class RemoveCartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            cart_item = Cart.objects.get(pk=pk, user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)

        cart_item.delete()
        return Response({"message": "Item removed from cart"})

# ----------------------------------------------------
