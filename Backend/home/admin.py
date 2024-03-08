from django.contrib import admin
from .models import (Student, Hostel, Unit, Room, Due)

# Register your models here.
admin.site.register(Student)
admin.site.register(Hostel)
admin.site.register(Unit)
admin.site.register(Room)
admin.site.register(Due)