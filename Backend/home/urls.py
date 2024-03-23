from django.urls import path, include
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', Students.as_view()),
    path('room/',Rooms.as_view()),
    # path('register/', Register.as_view()),
    path('token/', MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('student/<str:email>/', StudentByEmail.as_view()),
    path('student_room/<str:email>/', StudentRoomByEmail.as_view()),
    path('student_due/<str:email>/', StudentDueByEmail.as_view()),
]
