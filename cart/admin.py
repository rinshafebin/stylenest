from django.contrib import admin
from .models import CartItem, WishlistItem

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'is_selected', 'added_at', 'total_price')
    list_filter = ('is_selected', 'added_at')
    search_fields = ('user__email', 'product__name')
    readonly_fields = ('total_price',)
    ordering = ('-added_at',)


@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'added_at')
    search_fields = ('user__username', 'user__email', 'product__name')
    ordering = ('-added_at',)
