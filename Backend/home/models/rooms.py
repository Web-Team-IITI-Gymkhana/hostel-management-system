from django.db import models
from django.utils.translation import gettext as _
from .students import Student

class Room(models.Model):
    FURNITURE_CHOICES = [
        ('bed', 'Bed'),
        ('desk', 'Desk'),
        ('chair', 'Chair'),
        ('wardrobe', 'Wardrobe'),
    ]
    Room_ID = models.CharField(
        _("Alphabet of room"),
        max_length=1,)
    Student = models.ForeignKey(
        _("Student occupying current room"),
        Student, 
        on_delete=models.CASCADE,)
    furniture = models.CharField(
        _("Available furniture"),
        max_length=50, 
        choices=FURNITURE_CHOICES, 
        blank=True)
    is_Occupied = models.BooleanField(
        default=False,)
    
    def __str__(self):
        return f"Room {self.Room_ID}"

    def get_furniture_list(self):
        return self.furniture.split(',') if self.furniture else []

    def is_furniture_present(self, furniture_type):
        return furniture_type in self.get_furniture_list()
    
#EXAMPLE:
# room1 = Room(room_ID='101', furniture='bed,desk,chair')
# room1.save()
