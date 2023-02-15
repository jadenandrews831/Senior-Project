from .scrAApe import *

def task1(banner, pin):
    success = Authenticate(banner, pin)
    return success.auth()