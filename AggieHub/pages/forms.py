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
'''        
TERMS = [(term, term) for term in listterms]

class termForm(Form):
    term = forms.ChoiceField(choices=TERMS)
    class Meta:
        model = Term
        fields = "__all__"
        labels = {"term": ""}
        widgets = {
            'term': forms.Select(attrs={'class': 'form-control'})
        }
'''