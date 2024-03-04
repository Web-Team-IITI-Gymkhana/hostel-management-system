from django.db import models
from django.utils.translation import gettext as _

class Student(models.Model):
    """
    Stores Student Details
    """

    name = models.CharField(
        _("Name of Student"),
        max_length=50,
        help_text="This contains the name of the Student",
        null=True,
        default="",
        blank=True,
    )
    email = models.CharField(max_length=50, default="")
    roll_no = models.CharField(
        _("Roll number of Student"),
        max_length=10,
        help_text="This contains the roll number of the Student",
        null=True,
        default="",
        blank=True,
    )
    department = models.CharField(
        _("Department of Student"),
        max_length=50,
        help_text="This contains the department of the Student",
        null=True,
        default="",
        blank=True,
    )
    degree = models.CharField(
        _("Academic Program"),
        max_length=10,
        help_text="This contains the degree of the Student",
        null=True,
        default="",
        blank=True,
    )
    hostel = models.CharField(
        _("Hostel of Student"),
        max_length=3,
        help_text="This contains the hostel of the Student",
        null=True,
        default="",
        blank=True,
    )
    room_no = models.CharField(
        _("Room Number of Student"),
        max_length=5,
        help_text="This contains the room number of the Student",
        null=True,
        default="",
        blank=True,
    )

    def __str__(self):
        return str(self.email)

    class Meta:
        verbose_name = "Student Details"
        verbose_name_plural = "Student Details"
