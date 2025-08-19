from django.urls import path
from .views import WishListApiView,RemoveWishlistItem,CreateWishlistItems

urlpatterns = [
    path('list/', WishListApiView.as_view(), name='wishlist'),
    path('create/', CreateWishlistItems.as_view(), name='createwishlist'),
    path('remove/<int:pk>/', RemoveWishlistItem.as_view(), name='deletewishlist'),

]
