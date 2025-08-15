from django.urls import path
from .views import (
    OrderSummaryAPIView,
    ShippingAddressView,
)

urlpatterns = [
    path('shipping/', ShippingAddressView.as_view(), name='shipping'),
    path('summary/', OrderSummaryAPIView.as_view(), name='order-summary'),
    
]
