from django.contrib import admin
from .models import *

@admin.register(StudentData)
class StudentDataAdmin(admin.ModelAdmin):
    list_display = [field.name for field in StudentData._meta.fields]

@admin.register(StudentInfo)
class StudentInfoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in StudentInfo._meta.fields]
