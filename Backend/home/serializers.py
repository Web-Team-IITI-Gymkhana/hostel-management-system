from rest_framework import serializers
from django.db import models
from home.models import (Student,Hostel,Unit,Room,Due)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    Student = StudentSerializer(many = False)
    class Meta:
        model = Room
        fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    Room = RoomSerializer(many = True)
    class  Meta:
        model = Unit
        fields = '__all__'    

class HostelSerializer(serializers.ModelSerializer):
    Units = UnitSerializer(many = True)
    class Meta:
        model = Hostel
        fields = '__all__'
class DueSerializer(serializers.ModelSerializer):
    Student = StudentSerializer(many = False)
    class Meta:
        model = Hostel
        fields = '__all__'