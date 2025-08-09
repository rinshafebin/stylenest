from django.urls import path
from .views import WishListApiView

urlpatterns = [
    path('items/', WishListApiView.as_view(), name='wishlist'),
]
