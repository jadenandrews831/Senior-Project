from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.hashers import make_password
from .models import *
from .forms import *
from .tasks import *

#login required?
def home(request):
        terms = task2()
        context = {'terms': terms}
        return render(request, 'home.html', context)

#form data should be used to autheticate session for user through scrAApe and redirect to home page
def login(request):
    if (request.method == 'POST'): 
        form = loginForm(request.POST)
        if(form.is_valid()):
            form.banner_id = form.cleaned_data['banner_id']
            form.pin = form.cleaned_data['pin']
            response = task1(form.banner_id, form.pin)
            if (response == True):
                return redirect('home')
    return render(request, 'login.html', {'form': loginForm})
    
def get_subjects(request):
    if (request.method == 'POST'):
        term = request.POST['term']
        response = {
            'subjects': task3(term)
        }
    return JsonResponse(response)

def get_courses(request):
    if (request.method == 'POST'):
        subject = request.POST['subject']
        response = {
            'courses': task4(subject)
        }
    return JsonResponse(response)

def get_description(request):
    if (request.method == "POST"):
        course = request.POST.get('course')
        response = {
            'description': task5(course)
        }
    return JsonResponse(response)

#WIP
def override(request):
    return render(request, 'override.html')
#WIP
def guides(request):
    return render(request, 'guides.html')
#WIP
def contact(request):
    return render(request, 'contact.html')