from django.urls import path
from AdminPanel.views import (
    ViewAllUsers,
    AllProducts,
    CreateProduct,
    UserDetail,
    ProductDetails,
    ProductUpdate,
    ProductDelete,
    ViewProductsByCategory,
    AllOrders,
    AdminOrderUpdateView
    
    
)
urlpatterns = [
    path('allusers/',ViewAllUsers.as_view(),name='allusers'),
    path('userdetail/<int:pk>/',UserDetail.as_view(),name='userdetail'),
    
    path('allproducts/',AllProducts.as_view(),name='allproducts'),
    path('createproducts/',CreateProduct.as_view(),name='createproducts'),
    path('getproduct/<int:pk>/',ProductDetails.as_view(),name='productdetail'),
    path('updateproduct/<int:pk>/',ProductUpdate.as_view(),name='updateproduct'),
    path('deleteproduct/<int:pk>/',ProductDelete.as_view(),name='deleteproduct'),
    path('productbycategory/<str:category>/',ViewProductsByCategory.as_view(),name='productdetailbycategory'),
    path('allorders/',AllOrders.as_view(),name='products'),
    path("editorder/<int:pk>/", AdminOrderUpdateView.as_view(), name="admin-order-update"),


]
