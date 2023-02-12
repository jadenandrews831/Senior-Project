from django.shortcuts import redirect, render
from django.contrib.auth.hashers import make_password
from .models import StudentData
from .forms import loginForm

def home(request):
    return render(request, 'home.html')

#form data should be used to autheticate session for user through scrAApe and redirect to home page
def login(request):
    if (request.method == 'POST'): 
        form = loginForm(request.POST)
        if(form.is_valid()):
            log_in = form.save(commit=False)
            log_in.pin = make_password(form.cleaned_data['pin'])
            log_in.save()
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