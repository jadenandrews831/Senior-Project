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
    path('get_terms/', views.get_terms, name='get_terms'),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('images/favicon.ico'))),
    path('get_sections/', views.get_sections, name='get_sections'),
    path('get_profile/', views.get_profile, name='get_profile'),
     #WIP paths
    #path('logout/', views.logout, name='logout') for logout pag
]