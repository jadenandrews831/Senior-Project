# import os
# import sys

# path = os.getcwd()
# parent = os.path.dirname(path)

# print(f'{parent}/AggieHub/pages/')
# sys.path.insert(0, f'{parent}/pages/')

# from scrAApe import *
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
    return terms

#get subjects
def task3(term):
    global success
    scrape = ScrAApe(success)
    subjects = scrape.get_subject(term)
    return list(subjects.keys())

#get courses
def task4(subject):
    global success
    scrape = ScrAApe(success)
    courses = scrape.get_course(subject)
    return courses

#pulls all sections for selected course
def task5(course):
    global success
    scrape = ScrAApe(success)
    sections = scrape.get_section(course)
    print(sections)
    return sections

#pulls student information
def task6():
    global success
    scrape = ScrAApe(success)
    profile = scrape.get_profile()
    #print(profile)
    return profile

def task7(schedule):
    global success
    scrape = ScrAApe(success)
    result = scrape.register(schedule)
    return result