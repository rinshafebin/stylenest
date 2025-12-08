from django.contrib import admin
from .models import ShippingAddress, Order, OrderItem

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'address_line1', 'city', 'state', 'country', 'is_default', 'created_at')
    list_filter = ('is_default', 'country', 'state', 'city')
    search_fields = ('address_line1', 'address_line2', 'city', 'state', 'country', 'zip_code', 'phone_number')


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'price')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'payment_method', 'payment_status', 'created_at')
    list_filter = ('payment_status', 'payment_method', 'created_at')
    search_fields = ('user__username', 'razorpay_order_id', 'razorpay_payment_id')
    inlines = [OrderItemInline]
    readonly_fields = ('razorpay_order_id', 'razorpay_payment_id', 'total')
    ordering = ('-created_at',)
