from django.contrib.auth.backends import BaseBackend
from .tasks import *

## An authentication backend for the student data
#
# This backend is used to authenticate the student data.
# @param BaseBackend The base backend for the student data
# @return The username if the student data is valid, otherwise None
class StudentBackend(BaseBackend):
    def authenticate(username=None, password=None):
        try:
            if (task1(username, password) == True):
                return username
        except:
            return None
        