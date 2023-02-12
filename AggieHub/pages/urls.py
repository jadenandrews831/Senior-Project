from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='home'), #redirects to login page, change to home page with log in option there?
    path('login/', views.login, name='login'), 
    path('home/', views.home, name='home'),
    path('guides/', views.guides, name='guides'), 
    path('override/', views.override, name='override'),
    path('contact/', views.contact, name='contact'), 
    
     #WIP paths
    #path('logout/', views.logout, name='logout') for logout pag
]