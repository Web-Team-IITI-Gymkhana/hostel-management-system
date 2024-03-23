from rest_framework.serializers import ModelSerializer
from home.models import (Student,Hostel,Unit,Room,Due)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.throttling import UserRateThrottle

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    throttle_classes = [UserRateThrottle]
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['email'] = user.email
        token['username'] = user.username 
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email','password')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'user', 'roll_no', 'department', 'degree', 'hostel', 'room_no')

class RoomSerializer(ModelSerializer):
    Student = StudentSerializer(many = True ,read_only=True)
    class Meta:
        model = Room
        fields = '__all__'

class UnitSerializer(ModelSerializer):
    Room = RoomSerializer(many = True)
    class  Meta:
        model = Unit
        fields = '__all__'    

class HostelSerializer(ModelSerializer):
    Units = UnitSerializer(many = True)
    class Meta:
        model = Hostel
        fields = '__all__'
class DueSerializer(ModelSerializer):
    Student = StudentSerializer(many = True ,read_only=True)
    class Meta:
        model = Due
        fields = '__all__'

class VerifyOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email_is_verified","otp","email")

