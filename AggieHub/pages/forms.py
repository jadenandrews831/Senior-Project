from django.forms import ModelForm
from django import forms
from .models import *

class loginForm(ModelForm):
    banner_id = forms.TextInput()
    pin = forms.PasswordInput()
    class Meta:
        model = StudentData
        fields = "__all__"
        labels = {"banner_id": "", "pin": ""}
        widgets = {
            'banner_id': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Banner ID'}),
            'pin': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'PIN'})
        }
        
class selectCourse(ModelForm):
    class Meta:
        model = Section
        fields = "term", "subject", "course_id"
        labels = {"term": "Term", "subject": "Subject", "course_id": "Course"}
        
    def __init__(self, *args, **kwargs):
        super(selectCourse, self).__init__(*args, **kwargs)
        self.fields['term'].empty_label = "Select Term"
        self.fields['subject'].empty_label = "Select Subject"
        self.fields['course_id'].empty_label = "Select Course"