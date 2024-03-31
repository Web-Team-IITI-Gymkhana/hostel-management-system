from rest_framework.generics import ListCreateAPIView,CreateAPIView,DestroyAPIView,RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from home.models import (Student,Hostel,Unit,Room,Due,Complaint)
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
            complaints = room.room_complaints.all()
            serializer = self.get_serializer({
                'student': student,
                'room': room,
                'due': due,
                "complaint":complaints
            })
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'Email parameter is required'}, status=400)
        
class WardenDataByEmail(RetrieveUpdateDestroyAPIView):
    serializer_class = WardenDataSerializer

    def get(self, request, *args, **kwargs):
        email = kwargs.get('email')
        if email:
            user = get_object_or_404(User, email=email)
            student = get_object_or_404(Student, user=user)
            print(student.hostel, student.room_no)
            if user.role == 'WARDEN':
                hostel = get_object_or_404(Hostel, hostel_code=student.hostel)
                total_capacity = 0
                students_registered = 0
                rooms_is_occupied = 0
                total_complaints = 0
                complaints_resolved = 0
                furniture_counts = {}
                for unit in hostel.units.all():
                    for complaint in unit.unit_complaints.all():
                        total_complaints += 1
                        if complaint.is_resolved:
                            complaints_resolved += 1
                    for room in unit.rooms.all():
                        if room.students.user.role == 'STUDENT':
                            students_registered += 1
                        total_capacity += 1
                        if room.is_Occupied:
                            rooms_is_occupied += 1
                        for furniture_item in room.furniture.all():
                            furniture_counts[furniture_item.name] = furniture_counts.get(furniture_item.name, 0) + 1
                serialized_student = StudentSerializer(student).data
                return JsonResponse({
                    'total_capacity': total_capacity,
                    'registered_students':students_registered,
                    'rooms_is_occupied': rooms_is_occupied,
                    'furniture_counts': furniture_counts,
                    'total_complaints': total_complaints,
                    'complaints_resolved': complaints_resolved,
                    'student': serialized_student,
                })
            else:
                return JsonResponse({'error': 'User is not a warden'}, status=400)
        else:
            return JsonResponse({'error': 'Email parameter is required'}, status=400)
        

