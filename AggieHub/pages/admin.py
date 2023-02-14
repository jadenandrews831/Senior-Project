from django.contrib import admin
from .models import *

@admin.register(StudentData)
class StudentDataAdmin(admin.ModelAdmin):
    list_display = [field.name for field in StudentData._meta.fields]

@admin.register(Term)
class TermAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Term._meta.fields]
    
@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Subject._meta.fields]
    
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Course._meta.fields]
    
@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Section._meta.fields]
