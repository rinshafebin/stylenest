from django.urls import path
from .views import CreateOrderAPIView, VerifyPaymentAPIView

urlpatterns = [
    path("create/", CreateOrderAPIView.as_view(), name="create-payment-order"),
    path("verify/", VerifyPaymentAPIView.as_view(), name="verify-payment"),
]
