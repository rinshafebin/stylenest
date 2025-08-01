from django.urls import path
from Products.views import Products,ProductDetails,ViewProductsByCategory

urlpatterns = [

    path('allproducts/',Products.as_view(),name='products'),
    path('getproduct/<int:pk>/',ProductDetails.as_view(),name='productdetail'),
    path('productbycategory/<str:category>/',ViewProductsByCategory.as_view(),name='productdetailbycategory'),
   
]
