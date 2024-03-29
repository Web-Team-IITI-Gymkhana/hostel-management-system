from rest_framework.generics import ListCreateAPIView,CreateAPIView,DestroyAPIView,RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from home.models import (Student,Hostel,Unit,Room,Due)
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import *
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.throttling import UserRateThrottle
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
# Create your views here.

User = get_user_model()

class MytokenObtainPairView(TokenObtainPairView):
    throttle_classes = [UserRateThrottle]
    serializer_class = MyTokenObtainPairSerializer

# class StudentByEmail(RetrieveUpdateDestroyAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer

#     def get_object(self):
#         email = self.kwargs['email']
#         user = get_object_or_404(User, email=email)
#         student = get_object_or_404(Student, user=user)
#         return student

# class StudentRoomByEmail(RetrieveUpdateDestroyAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#     def get_object(self):
#         email = self.kwargs['email']
#         user = get_object_or_404(User, email=email)
#         student = get_object_or_404(Student, user=user)
#         room = get_object_or_404(Room,students = student)
#         print(room)
#         return room


# class StudentDueByEmail(RetrieveUpdateDestroyAPIView):
#     queryset = Due.objects.all()
#     serializer_class = DueSerializer
#     def get_object(self):
#         email = self.kwargs['email']
#         user = get_object_or_404(User, email=email)
#         student = get_object_or_404(Student, user=user)
#         due = get_object_or_404(Due,students = student)
#         return due

class Register(CreateAPIView):
    throttle_classes = [UserRateThrottle]
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
class StudentDataByEmail(RetrieveUpdateDestroyAPIView):
    serializer_class = StudentDataSerializer

    def get(self, request, *args, **kwargs):
        email = kwargs.get('email')
        if email:
            user = get_object_or_404(User, email=email)
            student = get_object_or_404(Student, user=user)
            room = get_object_or_404(Room, students=student)
            due = get_object_or_404(Due, students=student)

            serializer = self.get_serializer({
                'student': student,
                'room': room,
                'due': due,
            })
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'Email parameter is required'}, status=400)
