from django.contrib import admin
from .models.students import Student
from .models.hostels import Hostel
from .models.units import Unit
from .models.rooms import Room
from .models.dues import Dues

# Register your models here.
admin.site.register(Student)
admin.site.register(Hostel)
admin.site.register(Unit)
admin.site.register(Room)
admin.site.register(Dues)