from django.db import models
from django.utils.translation import gettext as _
from .students import Student
import datetime

class Complaint(models.Model):
    COMPLAINT_TYPES = (
        ('Room', 'Room'),
        ('Unit', 'Unit'),
    )
    title = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=1000)
    date = models.DateTimeField(null=False, default=datetime.datetime.now)
    is_resolved = models.BooleanField(default=False)
    complaint_type = models.CharField(max_length=4, choices=COMPLAINT_TYPES)
    unit_room_number = models.CharField(max_length=5)

    def __str__(self):
        return self.title
