from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('women', "Women's Collection"),
        ('men', "Men's Collection"),
        ('kids', "Kids Collection"),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES) 
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    rating = models.DecimalField(max_digits=2, decimal_places=1, default=4.5)
    review_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
