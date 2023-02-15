from .scrAApe import *

success = None

#verify user credentials
def task1(banner, pin):
    global success
    success = Authenticate(banner, pin)
    return success.auth

#get term - test
def task2():
    global success
    scrape = ScrAApe(success)
    terms = scrape.get_terms()
    print("TEST TERMS >>>> ", terms.keys())
    return list(terms.keys())
