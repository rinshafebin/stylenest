from django.contrib import admin
from .models import Product
from django.utils.html import format_html

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'is_active', 'created_at', 'image_tag')
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'details')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('price', 'stock', 'is_active')
    ordering = ('-created_at',)

    # Show thumbnail in admin
    def image_tag(self, obj):
        if obj.image:
            # Force Cloudinary to deliver JPG or PNG compatible format
            url = obj.image.url
            # add f_auto,q_auto for browser compatibility
            if "res.cloudinary.com" in url:
                url = url.replace("/upload/", "/upload/f_auto,q_auto/")
            return format_html('<img src="{}" width="50" height="50" />'.format(url))
        return "-"
    image_tag.short_description = 'Image'
