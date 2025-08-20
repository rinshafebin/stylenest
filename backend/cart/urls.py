# urls.py
from django.urls import path
from .views import AddToCartView, CartListView, UpdateCartItemView, RemoveCartItemView

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='cart-add'),
    path('list/', CartListView.as_view(), name='cart-list'),
    path('update/<int:pk>/', UpdateCartItemView.as_view(), name='cart-update'),
    path('remove/<int:pk>/', RemoveCartItemView.as_view(), name='cart-remove'),
]
