from rest_framework.serializers import ModelSerializer
from rest_framework import serializers 
from django.contrib.auth import get_user_model, password_validation, hashers

User = get_user_model()

class UserSerializer(ModelSerializer):
    
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    
    def validate(self, data):
        print('VALIDATA --->', data)
        password = data.pop('password')
        print('PASSY ---->', password)
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise serializers.ValidationError({ 'password_confirmation': 'Passwords do not match' })
        password_validation.validate_password(password)
        data['password'] = hashers.make_password(password)
        print('@@@@@@@@@@@@@@@ after custom validation', data)
        return data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation')