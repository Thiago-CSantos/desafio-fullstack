from authentication.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        groups = validated_data.pop('groups', []) 
        user_permissions = validated_data.pop('user_permissions', []) 

        user = User.objects.create_user(**validated_data)

        if groups:
            user.groups.set(groups)
        if user_permissions:
            user.user_permissions.set(user_permissions)

        return user