from django.urls import path
from .views import WishlistView

urlpatterns = [
    path('items/', WishlistView.as_view(), name='wishlist-items'),
]
