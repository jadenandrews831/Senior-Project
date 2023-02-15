from django.shortcuts import redirect, render
from django.contrib.auth.hashers import make_password
from .models import *
from .forms import *
from .tasks import *

def home(request):
    if (request.method == 'POST'):
        form = selectCourse(request.POST)
        if(form.is_valid()):
            return redirect('override')
    return render(request, 'home.html', {'form': selectCourse})

#form data should be used to autheticate session for user through scrAApe and redirect to home page
def login(request):
    if (request.method == 'POST'): 
        form = loginForm(request.POST)
        if(form.is_valid()):
            form.banner_id = form.cleaned_data['banner_id']
            form.pin = form.cleaned_data['pin']
            response = authenticate(form.banner_id, form.pin)
            #log_in.pin = make_password(form.cleaned_data['pin'])
            #log_in.save()
            if (response == True):
                return redirect('home')
    return render(request, 'login.html', {'form': loginForm})

#WIP
def override(request):
    return render(request, 'override.html')
#WIP
def guides(request):
    return render(request, 'guides.html')
#WIP
def contact(request):
    return render(request, 'contact.html')