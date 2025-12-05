


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  
        read_only_fields = ['id', 'user', 'created_at']  