from rest_framework import serializers
from Auth.models import CustomUser
from Orders.models import Order

class ViewAllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username','email','is_active','date_joined','phone_number']



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  
        read_only_fields = ['id', 'user', 'created_at']  