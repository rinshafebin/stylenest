from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('women', "Women's Collection"),
        ('men', "Men's Collection"),
        ('kids', "Kids Collection"),
    ]

    name = models.CharField(max_length=200, db_index=True) 
    slug = models.SlugField(blank=True, unique=True, db_index=True)  
    description = models.TextField()
    details = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)  
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, db_index=True)
    stock = models.PositiveIntegerField(default=0)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    is_active = models.BooleanField(default=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at'] 
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['slug']),
            models.Index(fields=['category']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
