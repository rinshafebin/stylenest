from django.urls import path
from .views import EditProfileAPIView

urlpatterns = [
    path('profile/', EditProfileAPIView.as_view(), name='profile'),
    path('updateprofile/', EditProfileAPIView.as_view(), name='edit-profile'),

]
