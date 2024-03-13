from django.db import models
from django.utils.translation import gettext as _
import uuid
from django.contrib.auth.models import (
    AbstractUser,
    PermissionsMixin,
)

class User(AbstractUser):
    email = models.EmailField(max_length=225,unique=True)
    email_is_verified = models.BooleanField(null=True,default=False,blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


