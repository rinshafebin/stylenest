from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('women', "Women's Collection"),
        ('men', "Men's Collection"),
        ('kids', "Kids Collection"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES) 
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='products/')

    rating = models.FloatField(default=0.0)  
    reviews = models.PositiveIntegerField(default=0)  
    sizes = models.JSONField(blank=True, default=list)  
    details = models.JSONField(blank=True, default=list)  

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
