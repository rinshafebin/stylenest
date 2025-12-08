from django.urls import path
from products.views import (
    Products,
    ProductDetails,
    ViewProductsByCategory,
    SearchProducts,
    AllProducts,
    CreateProduct,
    ProductUpdate,
    ProductDelete,
)

urlpatterns = [
    # ---------- PUBLIC APIs ----------
    path('list/', Products.as_view(), name='public-products-list'),
    path('<int:pk>/', ProductDetails.as_view(), name='public-product-detail'),
    path('category/<str:category>/', ViewProductsByCategory.as_view(), name='public-products-by-category'),
    path('search/', SearchProducts.as_view(), name='public-search-products'),

    # ---------- ADMIN CRUD APIs ----------
    path('admin/all/', AllProducts.as_view(), name='admin-products-list'),
    path('admin/create/', CreateProduct.as_view(), name='admin-create-product'),
    path('admin/update/<int:pk>/', ProductUpdate.as_view(), name='admin-product-update'),
    path("admin/delete/<int:pk>/", ProductDelete.as_view(), name="product-delete"),
    
]
