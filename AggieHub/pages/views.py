import json
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.hashers import make_password
from django.conf import settings
from .models import *
from .forms import *
from .tasks import *
from .authentication import StudentBackend

#@login_required(login_url='login')
def home(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'home.html')
    else:
        return redirect('login')

#form data should be used to autheticate session for user through scrAApe and redirect to home page
def login(request):
    if (request.method == 'POST'): 
        form = loginForm(request.POST)
        if(form.is_valid()):
            # authenticate user and create session
            user = StudentBackend.authenticate(username=form.cleaned_data['banner_id'], password=form.cleaned_data['pin'])
            # print (user)
            # form.banner_id = form.cleaned_data['banner_id']
            # form.pin = form.cleaned_data['pin']
            # response = task1(form.banner_id, form.pin)
            if user is not None:
                request.session['banner_id'] = form.cleaned_data['banner_id']
                return redirect('home')
            # if (response == True):
            #     return redirect('home')
            # else:
            #     return render(request, 'login.html', {'form': form, 'error': 'Invalid Banner ID or PIN'})
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
        # print(json.loads(schedule))
        # print(type(json.loads(schedule)))
        # print(type(json.loads(schedule)['pkg']))
        response = task7((json.loads(schedule)['pkg']))
        return JsonResponse(response)

#@login_required(login_url='login')
def override(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'override.html')
    else:
        return redirect('login')

#@login_required(login_url='login')
def guides(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'guides.html')
    else:
        return redirect('login')

#@login_required(login_url='login')
def contact(request):
    if(request.session.has_key('banner_id')):
        if (request.method == 'POST'):
            email = request.POST['email']
            topic = request.POST['topic']
            message = request.POST['message']
        
            send_mail(topic, message, email, 
                    [settings.EMAIL_HOST_USER], 
                    fail_silently=False)
        return render(request, 'contact.html')
    else:
        return redirect('login')

def logout(request):
    del request.session['banner_id']
    return redirect('login')