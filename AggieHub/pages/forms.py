from django.forms import ModelForm, Form
from django import forms
from .models import *

## A form for the login page
#
#  This form is used to get the student's banner ID and PIN. It is used in the login page.
#  @param ModelForm The form for the student data

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
    