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

##
#home function 
#
#Checks to make sure that the request has the correct banner id in order to allow access to the home page.
def home(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'home.html')
    else:
        return redirect('login')

##
#login function
#
#Takes in the form input of the student's banner ID and their pin and authenticates it with Aggie Access.
#Should both inputs be valid, then it will take them to the home function. If input isnt valid, it will post a messege
#to user that "Banner ID or PIN is invalid. Please try again.".
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

##
#get_subjects function
#
#Checks if the term has been posted, then lists out the subjects for that term.
def get_subjects(request):
    if (request.method == 'POST'):
        term = request.POST['term']
        response = {
            'subjects': task3(term)
        }
    return JsonResponse(response)

##
#get_courses function
#
#Checks if the subject has been posted, then lists out the courses for the selected subject.
def get_courses(request):
    if (request.method == 'POST'):
        subject = request.POST['subject']
        courses = task4(subject)
        response = {
            'course_id': list(courses.keys()),
            'course_name': list(courses.values())
        }
    return JsonResponse(response)

##
#get_sections function
#
#Checks if the course has been posted, then lists out the sections for that course.
def get_sections(request):
    if (request.method == 'POST'):
        course = request.POST['course']
        response = {
            'sections': task5(course)
        }
    return JsonResponse(response)

##
#get_profile function
#
#Outputs the profile data of the student.
def get_profile(request):
    if (request.method == 'POST'):
        return JsonResponse(task6().__dict__)

##
#get_terms function
#
#Lists out the available terms to be selected by the student.
def get_terms(request):
    if (request.method == 'POST'):
        terms = task2()
        response = {
            'terms': list(terms.keys()),
            'p_term': list(terms.values())
        }
        return JsonResponse(response)

##
#register_student function
#
#Takes the created schedule made by the student and submits the CRN to Aggie Access to register student.
def register_student(request):
    if (request.method == 'POST'):
        schedule = request.POST['schedule']
        response = task7((json.loads(schedule)['pkg']))
        return JsonResponse(response)

##
#override
#
#Checks to make sure that the request has the correct banner id in order to allow access to the override page.
def override(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'override.html')
    else:
        return redirect('login')

##
#override
#
#Checks to make sure that the request has the correct banner id in order to allow access to the guides page.
def guides(request):
    if(request.session.has_key('banner_id')):
        return render(request, 'guides.html')
    else:
        return redirect('login')

##
#override
#
#Checks to make sure that the request has the correct banner id in order to allow access to the contact page.
#This function also controls the IT helpdesk form submission should the student need to reach out for IT support for the website.
#It takes in the fields: email, topic, and message. After being submitted, it posts a message to the student "Form submission successful".
def contact(request):
    if(request.session.has_key('banner_id')):
        if (request.method == 'POST'):
            email = request.POST['email']
            topic = request.POST['topic']
            message = request.POST['message']
        
            send_mail(topic, message, email, 
                    [settings.EMAIL_HOST_USER], 
                    fail_silently=False)
            messages.success(request, 'Form submission successful')
        return render(request, 'contact.html')
    else:
        return redirect('login')

##
#logout function
#
#Logs out the student from the authenticated session and takes them back to the login page.
def logout(request):
    del request.session['banner_id']
    return redirect('login')