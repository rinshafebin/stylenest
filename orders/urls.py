from django.urls import path
from .views import (
    CreateOrderAPIView,
    OrderSummaryAPIView,
    VerifyPaymentAPIView,
    UserOrdersAPIView,
    OrderDetailAPIView,
    AdminOrderListAPIView,
    ShippingAddressListCreateView,
    ShippingAddressDetailView,
)

urlpatterns = [
    path('summary/', OrderSummaryAPIView.as_view(), name='order-summary'),
    path("create/", CreateOrderAPIView.as_view(), name="create-order"),
    path("verify-payment/", VerifyPaymentAPIView.as_view(), name="verify-payment"),
    path("user-orders/", UserOrdersAPIView.as_view(), name="user-orders"),
    path("order/<int:order_id>/", OrderDetailAPIView.as_view(), name="order-detail"),
    path("admin-orders/", AdminOrderListAPIView.as_view(), name="admin-orders"),
    path("shipping-address/", ShippingAddressListCreateView.as_view(), name="shipping-address-list-create"),
    path("shipping-address/<int:pk>/", ShippingAddressDetailView.as_view(), name="shipping-address-detail"),
]
