from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,CreateAPIView,DestroyAPIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from home.models import (Student,Hostel,Unit,Room,Due)
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import *
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
# Create your views here.

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['email'] = user.email
        token['username'] = user.username 
        return token

class MytokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Students(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class Rooms(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class Register(CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        print(data)

        user_serializer = UserSerializer(
        data={
            'email': data['email'],
            'username': data['username'],
            'password': data['password'],
        })

        if user_serializer.is_valid():
            user = user_serializer.save()
            user.set_password(data['password'])  # Set and hash the password
            user.save()
        else:
            return Response({'error': user_serializer.errors}, status=400)

        
        student_data = {
            'user': user.id,
            'roll_no': data.get('roll_no', ''),
            'department': data.get('department', ''),
            'degree': data.get('degree', ''),
            'hostel': data.get('hostel', ''),
            'room_no': data.get('room_no', ''),
        }
        
        student_serializer = StudentSerializer(data=student_data)

        if student_serializer.is_valid():
            student_serializer.save()
        else:
            user.delete()
            return Response({'error': student_serializer.errors}, status=400)

        response_data = {
            'user': user_serializer.data,
            'student': student_serializer.data,
        }
        return Response(response_data)

    
class UserDeleteView(DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173"
    client_class = OAuth2Client