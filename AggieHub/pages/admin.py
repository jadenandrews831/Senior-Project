from django.contrib import admin
from .models import StudentData

@admin.register(StudentData)
class StudentDataAdmin(admin.ModelAdmin):
    list_display = [field.name for field in StudentData._meta.fields]
