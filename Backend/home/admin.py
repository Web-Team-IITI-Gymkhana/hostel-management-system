from django.contrib import admin
from .models import Student, Hostel, Unit, Room, Due, Furniture, Complaint

# Register your models here.
admin.site.register(Unit)
admin.site.register(Room)
admin.site.register(Due)
admin.site.register(Furniture)
admin.site.register(Complaint)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'hostel']

@admin.register(Hostel)
class HostelAdmin(admin.ModelAdmin):
    list_display = ['hostel_name', 'hostel_code']
