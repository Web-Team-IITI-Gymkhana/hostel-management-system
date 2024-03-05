from django.db import models
from django.utils.translation import gettext as _
from .students import Student

class Dues(models.Model):
    students = models.ForeignKey(Student, on_delete=models.CASCADE)
    Remaining_Due = models.IntegerField(
        null=True,
        blank=True,)
    No_Dues = models.BooleanField(
        default=False)