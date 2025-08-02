# urls.py
from django.urls import path
from .views import AddToCartView, CartListView, UpdateCartItemView, RemoveCartItemView

urlpatterns = [
    path('cart/add/', AddToCartView.as_view(), name='cart-add'),
    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/update/<int:pk>/', UpdateCartItemView.as_view(), name='cart-update'),
    path('cart/remove/<int:pk>/', RemoveCartItemView.as_view(), name='cart-remove'),
]
