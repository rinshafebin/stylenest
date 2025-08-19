from django.urls import path
from products.views import (
    Products,
    ProductDetails,
    ViewProductsByCategory,
    Search_products
)

urlpatterns = [
    path('search/', Search_products.as_view(), name='search-products'),
    path('allproducts/',Products.as_view(),name='products'),
    path('getproduct/<int:pk>/',ProductDetails.as_view(),name='productdetail'),
    path('productbycategory/<str:category>/',ViewProductsByCategory.as_view(),name='productdetailbycategory'),

]
