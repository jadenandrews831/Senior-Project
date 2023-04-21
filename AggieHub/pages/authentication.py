from django.contrib.auth.backends import BaseBackend
from .tasks import *

class StudentBackend(BaseBackend):
    def authenticate(username=None, password=None):
        try:
            if (task1(username, password) == True):
                return username
        except:
            return None
        