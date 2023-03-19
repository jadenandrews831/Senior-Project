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

#get subjects
def task3(term):
    global success
    scrape = ScrAApe(success)
    subjects = scrape.get_subject(term)
    return list(subjects.keys())

#get courses - under construction
def task4(subject):
    global success
    scrape = ScrAApe(success)
    courses = scrape.get_course(subject)
    return list(courses)

#get description of selected course
def task5(course):
    global success
    scrape = ScrAApe(success)
    description = scrape.get_description(course)
    return description

#pulls all sections for selected course
def task6(course):
    global success
    scrape = ScrAApe(success)
    sections = scrape.get_sections(course)
    return sections

#pulls student information
def task7():
    global success
    scrape = ScrAApe(success)
    profile = scrape.get_profile()
    print(profile)
    return profile