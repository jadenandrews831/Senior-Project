from django.contrib import admin
from .models import *

## Models are registered for the admin page
#
#  The StudentData model is registered for the admin page. This allows the admin to view the student data.
#  @param SutdentData The model for the student data
@admin.register(StudentData)
class StudentDataAdmin(admin.ModelAdmin):
    list_display = [field.name for field in StudentData._meta.fields]