from django.db import models
from django.utils.translation import gettext as _
import uuid
from django.contrib.auth.models import (
    AbstractUser,
    PermissionsMixin,
)

class User(AbstractUser):
    ROLE_CHOICES = (
        ('SUPERADMIN','superadmin'),
        ('ADMIN', 'admin'),
        ('WARDEN', 'warden'),
        ('STUDENT', 'student'),
        # Add more choices as needed
    )
    email = models.EmailField(max_length=225,unique=True)
    email_is_verified = models.BooleanField(null=True,default=False,blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


