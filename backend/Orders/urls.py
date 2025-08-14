from django.urls import path
from . import views

urlpatterns = [
    path('shipping/', views.ShippingAddressView.as_view(), name='shipping'),
]
