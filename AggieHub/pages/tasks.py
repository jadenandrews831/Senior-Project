from .scrAApe import *

success = None

#verify user credentials
def task1(banner, pin):
    global success
    success = Authenticate(banner, pin)
    return success.auth

#get terms
def task2():
    global success
    scrape = ScrAApe(success)
    terms = scrape.get_terms()
    return list(terms.keys())

#get subjects - under construction
def task3(term):
    global success
    scrape = ScrAApe(success)
    subjects = scrape.get_subject(term)
    print(list(subjects.keys()))
    return list(subjects.keys())

#get courses - under construction
def task4(subject):
    global success
    scrape = ScrAApe(success)
    courses = scrape.get_courses(subject)
    return list(courses.keys())

def task5(course):
    global success
    scrape = ScrAApe(success)
    description = scrape.get_description(course)
    return description