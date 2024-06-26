from django.urls import path, include
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # path('register/', Register.as_view()),
    path('token/', MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/', include('allauth.urls')), 
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('google/', GoogleLogin.as_view(), name='google_login'),
    # path('student/<str:email>/', StudentByEmail.as_view()),
    # path('student_room/<str:email>/', StudentRoomByEmail.as_view()),
    # path('student_due/<str:email>/', StudentDueByEmail.as_view()),
    # path('profile_photo/', ProfilePhotoView.as_view(), name='profile_photo'),
    path('student_data/<str:email>/', StudentDataByEmail.as_view()),
    path('warden_data/<str:email>/', WardenDataByEmail.as_view()), 
    path('swap-student-rooms/', SwapStudentData.as_view()),
]
