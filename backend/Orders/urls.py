from django.urls import path
from Orders.views import ShippingAddressView, CreateOrderView

urlpatterns = [
    path('shipping-address/', ShippingAddressView.as_view(), name='shipping-address'),
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
]
