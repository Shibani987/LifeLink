from rest_framework import serializers
from .models import User, EmergencyRequest

class UserSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(required=True)
    bloodGroup = serializers.CharField(source='blood_group', required=False, allow_blank=True, allow_null=True)
    organs = serializers.JSONField(required=False)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
            
    }

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)



class EmergencyRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyRequest
        fields = '__all__'
