from django.shortcuts import render
from rest_framework import generics
from home.models import (Student,Hostel,Unit,Room,Dues)
from .serializers import *
# Create your views here.


class Students(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer