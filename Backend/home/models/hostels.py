from django.db import models
from django.utils.translation import gettext as _
from .units import Unit

class Hostel(models.Model):
    hostel_name = models.CharField(
        _("Name of Hostel"),
        max_length=50,        
        help_text="This contains the name of the Hostel",
        null=True,
        default="",
        blank=True)
    hostel_code = models.CharField(
        _("Hostel Code"),
        max_length=3, 
        null=True, 
        default="",
        blank=True)
    description = models.CharField(
        max_length=500,
        null=True, 
        default="",
        blank=True)
    units = models.ManyToManyField(
        Unit, 
        )