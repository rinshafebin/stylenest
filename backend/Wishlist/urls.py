from django.urls import path
from Cart.views import AddToWishView

urlpatterns = [
    path('addtowishlist/',AddToWishView.as_view(),name='Wishlist')

]
