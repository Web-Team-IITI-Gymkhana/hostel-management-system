from django.db import models
from django.utils.translation import gettext as _
from .students import Student
from .furnitures import Furniture
from .complaints import Complaint

class Room(models.Model):
    # FURNITURE_CHOICES = [
    #     ('bed', 'Bed'),
    #     ('desk', 'Desk'),
    #     ('chair', 'Chair'),
    #     ('wardrobe', 'Wardrobe'),
    # ]
    Room_ID = models.CharField(
        _("Alphabet of room"),
        max_length=1,)
    students = models.ForeignKey(
        Student, 
        null=True,
        on_delete=models.SET_NULL)
    furniture = models.ManyToManyField(
        Furniture, 
        verbose_name=_("Available furniture"), 
        blank=True)
    is_Occupied = models.BooleanField(
        default=False,)
    room_complaints = models.ManyToManyField(
        Complaint,
        verbose_name=_("Room Specific Complaints"),
        blank=True,)
    
    def __str__(self):
        return f"Room {self.Room_ID}"

    def get_furniture_list(self):
        return list(self.furniture.all())

    def is_furniture_present(self, furniture_name):
        return self.furniture.filter(name=furniture_name).exists()

# EXAMPLE:
# room1 = Room(Room_ID='101', is_Occupied=True)
# room1.save()
# bed = Furniture.objects.create(name='Bed')
# desk = Furniture.objects.create(name='Desk')
# chair = Furniture.objects.create(name='Chair')
# room1.furniture.add(bed, desk, chair)