from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('Auth.urls')),
    path('adminside/', include('AdminPanel.urls')),
    path('cart/', include('cart.urls')),
    path('products/', include('products.urls')),
    path('wishlist/', include('Wishlist.urls')),
    path('user/', include('user.urls')),
    path('orders/', include('Orders.urls')),
    path('payment/', include('Payment.urls')),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
