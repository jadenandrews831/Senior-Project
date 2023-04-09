import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.hashers import make_password
from .models import *
from .forms import *
from .tasks import *

#login required, redirect if not logged in
def home(request):
        #if (request.session.has_key('banner_id') == False):
        #     return redirect('login')
        # banner_id = request.session['banner_id']
        #terms = task2()
        #context = {'terms': terms}
        return render(request, 'home.html')

#form data should be used to autheticate session for user through scrAApe and redirect to home page
def login(request):
    if (request.method == 'POST'): 
        form = loginForm(request.POST)
        if(form.is_valid()):
            form.banner_id = form.cleaned_data['banner_id']
            form.pin = form.cleaned_data['pin']
            response = task1(form.banner_id, form.pin)
            if (response == True):
                #request.session['banner_id'] = form.banner_id
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
        courses = task4(subject)
        response = {
            'course_id': list(courses.keys()),
            'course_name': list(courses.values())
        }
    return JsonResponse(response)

def get_sections(request):
    if (request.method == 'POST'):
        course = request.POST['course']
        response = {
            'sections': task5(course)
        }
    return JsonResponse(response)

def get_profile(request):
    if (request.method == 'POST'):
        return JsonResponse(task6().__dict__)

def get_terms(request):
    if (request.method == 'POST'):
        terms = task2()
        response = {
            'terms': list(terms.keys()),
            'p_term': list(terms.values())
        }
        return JsonResponse(response)
    
def register_student(request):
    if (request.method == 'POST'):
        schedule = request.POST['schedule']
        
        response = task7(json.loads(schedule))
        return JsonResponse(response)

def override(request):
    return render(request, 'override.html')

def guides(request):
    return render(request, 'guides.html')

def contact(request):
    return render(request, 'contact.html')