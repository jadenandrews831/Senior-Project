from django.forms import ModelForm, Form
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
        
class contactForm(Form):
    email = forms.EmailField()
    subject = forms.MultipleChoiceField()
    message = forms.Textarea()
    class Meta:
        fields = "__all__"
        widgets = {
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'example@aggies.ncat.edu'}),
            'subject': forms.Select(attrs={'class': 'form-control'}),
            'message': forms.Textarea(attrs={'class': 'form-control'}),
        }
    