from django.urls import path
from .views import AddToCartView, CartListView, UpdateCartItemView, RemoveCartItemView, WishlistListView, WishlistAddView, WishlistDeleteView

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('list/', CartListView.as_view(), name='cart-list'),
    path('<int:pk>/update/', UpdateCartItemView.as_view(), name='cart-update'),
    path('<int:pk>/remove/', RemoveCartItemView.as_view(), name='cart-remove'),
    path("wishlist/", WishlistListView.as_view(), name="wishlist-list"),
    path("wishlist/add/", WishlistAddView.as_view(), name="wishlist-add"),
    path("wishlist/<int:item_id>/", WishlistDeleteView.as_view(), name="wishlist-delete"),
]
 