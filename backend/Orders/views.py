# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from Orders.serializers import ShippingAddressSerializer,OrderSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from Products.models import Product
# # Create your views here.



# # ---------------- shipping address creating view --------------------------

# class ShippingAddressView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self,request):
#         serializer = ShippingAddressSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# # ------------------- order creating view ----------------------------------

# class CreateOrderView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self,request):
#         data = request.data.copy()
#         data['user'] = request.user.id
        
#         total = 0
#         for item in data.get('items',[]):
#             product_id = item['product']
#             quantity =item['quantity'] 
#             try :
#                 product = Product.objects.get(id=product_id)
#                 if product.stock < quantity:
#                     return Response({'error': f'Not enough stock for {product.name}'}, status=status.HTTP_400_BAD_REQUEST)
#                 total += product.price*quantity
#                 item['price'] = str(product.price)
#             except Product.DoesNotExist:
#                 return Response({'error': 'Invalid product'}, status=status.HTTP_400_BAD_REQUEST)
            
#         data['total_price'] =total
#         serializer =OrderSerializer(data = data)
#         if serializer.is_valid():
#             order = serializer.save()
            
#             for item in order.items.all():
#                 product = item.product
#                 product.stock -= item.quantity
#                 product.save()
#             return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
       
        
# # --------------------------------------------------------------------------------------------