from django.db import models
from django.utils.translation import gettext as _
from .rooms import Room


class Unit(models.Model):
    FURNITURE_CHOICES = [
        ('2-seater-sofa', '2-Seater-Sofa'),
        ('table', 'Table'),
        ('1-seater-sofa', '1-Seater-Sofa'),
    ]
    Unit_number = models.PositiveIntegerField()
    furniture = models.CharField(
        _("Available furniture"),
        max_length=50, 
        choices=FURNITURE_CHOICES, 
        blank=True)
    Room = models.ManyToManyField(
        Room, 
        on_delete=models.CASCADE)

    def __str__(self):
        return f"Unit {self.Unit_number}"

    def get_furniture_list(self):
        return self.furniture.split(',') if self.furniture else []

    def is_furniture_present(self, furniture_type):
        return furniture_type in self.get_furniture_list()
    
