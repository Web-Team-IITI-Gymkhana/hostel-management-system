from rest_framework.serializers import ModelSerializer
from home.models import (Student,Hostel,Unit,Room,Due)

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

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
    Student = StudentSerializer(many = False)
    class Meta:
        model = Hostel
        fields = '__all__'