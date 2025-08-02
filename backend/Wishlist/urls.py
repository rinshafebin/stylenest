from django.urls import path
from .views import WishlistView

urlpatterns = [
    path('add/', WishlistView.as_view(), name='wishlist'),
    path('list/<int:product_id>/', WishlistView.as_view(), name='wishlist-delete'),
]
