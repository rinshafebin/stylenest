from django.urls import path
from .views import (
    OrderSummaryAPIView,
    ShippingAddressView,
    MyOrdersView,
    CancelOrderView
)

urlpatterns = [
    path('shipping/', ShippingAddressView.as_view(), name='shipping'),
    path('summary/', OrderSummaryAPIView.as_view(), name='order-summary'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),

]
