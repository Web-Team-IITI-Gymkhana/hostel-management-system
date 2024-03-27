from rest_framework.serializers import ModelSerializer
from home.models import (Student,Hostel,Unit,Room,Due, Furniture, Complaint)
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

class FurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furniture
        fields = ['id', 'name']

class RoomSerializer(serializers.ModelSerializer):
    furniture = FurnitureSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id', 'Room_ID', 'students', 'furniture', 'is_Occupied']

    def create(self, validated_data):
        furniture_data = validated_data.pop('furniture')
        room = Room.objects.create(**validated_data)
        for furniture_item in furniture_data:
            furniture, _ = Furniture.objects.get_or_create(**furniture_item)
            room.furniture.add(furniture)
        return room

    def update(self, instance, validated_data):
        instance.Room_ID = validated_data.get('Room_ID', instance.Room_ID)
        instance.students = validated_data.get('students', instance.students)
        instance.is_Occupied = validated_data.get('is_Occupied', instance.is_Occupied)

        furniture_data = validated_data.get('furniture', [])
        instance.furniture.clear()
        for furniture_item in furniture_data:
            furniture, _ = Furniture.objects.get_or_create(**furniture_item)
            instance.furniture.add(furniture)

        instance.save()
        return instance

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

class StudentDataSerializer(serializers.Serializer):
    student = StudentSerializer()
    room = RoomSerializer()
    due = DueSerializer()

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

