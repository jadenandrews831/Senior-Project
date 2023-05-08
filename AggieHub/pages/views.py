import json
from django.contrib import messages
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.signals import user_login_failed
from django.conf import settings
from .models import *
from .forms import *
from .tasks import *
from .authentication import StudentBackend

## render the home page
# @param request The HTTP request
# @return The rendered home page if the student is logged in, otherwise the login page
def home(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'home.html')
    else:
        return redirect('login')

## authenticate the student and render the login page
# if the student's credentials are invalid, an error message is displayed
# @param request The HTTP request
# @return The rendered login page if the student is not logged in, otherwise the home page
def login(request):
    if (request.method == 'POST'): 
        form = loginForm(request.POST)
        if(form.is_valid()):
            user = StudentBackend.authenticate(username=form.cleaned_data['banner_id'], password=form.cleaned_data['pin'])
            if user is not None:
                request.session['banner_id'] = form.cleaned_data['banner_id']
                return redirect('home')
            else:
                messages.error(request,'Banner ID or PIN is invalid. Please try again.')
                return redirect('login')
            
    return render(request, 'login.html', {'form': loginForm})

## load subjects based on the selected term
# @param request The HTTP request
# @return A JSON response containing a dictionary of subjects
def get_subjects(request):
    if (request.method == 'POST'):
        term = request.POST['term']
        response = {
            'subjects': task3(term)
        }
    return JsonResponse(response)

## load courses based on the selected subject
# @param request The HTTP request
# @return A JSON response containing a dictionary of lists of course ids and course names
def get_courses(request):
    if (request.method == 'POST'):
        subject = request.POST['subject']
        courses = task4(subject)
        response = {
            'course_id': list(courses.keys()),
            'course_name': list(courses.values())
        }
    return JsonResponse(response)

## load sections based on the selected course
# @param request The HTTP request
# @return A JSON response containing a dictionary of section data
def get_sections(request):
    if (request.method == 'POST'):
        course = request.POST['course']
        response = {
            'sections': task5(course)
        }
    return JsonResponse(response)

## load student profile data
# @param request The HTTP request
# @return A JSON response containing a dictionary of profile data
def get_profile(request):
    if (request.method == 'POST'):
        return JsonResponse(task6().__dict__)

## load available terms for the student
# @param request The HTTP request
# @return A JSON response containing a dictionary of lists of terms and their respective term codes
def get_terms(request):
    if (request.method == 'POST'):
        terms = task2()
        response = {
            'terms': list(terms.keys()),
            'p_term': list(terms.values())
        }
        return JsonResponse(response)

## register the student for the selected sections
# @param request The HTTP request
# @return A JSON response containing a dictionary of the results of the registration
def register_student(request):
    if (request.method == 'POST'):
        schedule = request.POST['schedule']
        response = task7((json.loads(schedule)['pkg']))
        return JsonResponse(response)

## render the override page
# @param request The HTTP request
# @return The rendered override page if the student is logged in, otherwise the login page
def override(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'override.html')
    else:
        return redirect('login')

## render the curriculum guides page
# @param request The HTTP request
# @return The rendered curriculum guides page if the student is logged in, otherwise the login page
def guides(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'guides.html')
    else:
        return redirect('login')

## render the contact page and send an email if the form is submitted
# @param request The HTTP request
# @return The rendered contact page if the student is logged in, otherwise the login page
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

## delete the student's session and redirect to the login page
# @param request The HTTP request
# @return The rendered login page
def logout(request):
    del request.session['banner_id']
    return redirect('login')