from django.urls import path
from . import views
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', views.login, name='home'),
    path('login/', views.login, name='login'), 
    path('home/', views.home, name='home'),
    path('guides/', views.guides, name='guides'), 
    path('override/', views.override, name='override'),
    path('contact/', views.contact, name='contact'), 
    path('get_subjects/', views.get_subjects, name='get_subjects'),
    path('get_courses/', views.get_courses, name='get_courses'),
    path('get_description/', views.get_description, name='get_description'),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('images/favicon.ico')))
     #WIP paths
    #path('logout/', views.logout, name='logout') for logout pag
]