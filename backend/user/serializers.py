from rest_framework import serializers
from Auth.models import CustomUser
from user.models import UserAddress

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'address']
        read_only_fields = ['email'] 


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data["user"] = user
        return super().create(validated_data)
