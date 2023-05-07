# import os
# import sys

# path = os.getcwd()
# parent = os.path.dirname(path)

# print(f'{parent}/AggieHub/pages/')
# sys.path.insert(0, f'{parent}/pages/')

# from scrAApe import *
from .scrAApe import *

success = None


##
#task1 function
#
#Takes in banner ID and pin from login form and verifies user credentials.
def task1(banner, pin):
    global success
    success = Authenticate(banner, pin)
    return success.auth


##
#task2 function
#
#Gets the desired term by pulling it off of Aggie Access.
def task2():
    global success
    scrape = ScrAApe(success)
    terms = scrape.get_terms()
    return terms

##
#task3 function
#
#Gets the subjects off of Aggie Access with the term that was selected prior.
def task3(term):
    global success
    scrape = ScrAApe(success)
    subjects = scrape.get_subject(term)
    return list(subjects.keys())

##
#task4 function
#
#Gets the courses off of Aggie Access with the subject that was selected prior.
def task4(subject):
    global success
    scrape = ScrAApe(success)
    courses = scrape.get_course(subject)
    return courses

##
#task5 function
#
#Gets all the sections for the selected course from Aggie Access.
def task5(course):
    global success
    scrape = ScrAApe(success)
    sections = scrape.get_section(course)
    print(sections)
    return sections

##
#task6 function
#
#Gets the student information off of Aggie Access.
def task6():
    global success
    scrape = ScrAApe(success)
    profile = scrape.get_profile()
    #print(profile)
    return profile

##
#task7 function
#
#Register's the student in Aggie Access.
def task7(schedule):
    global success
    scrape = ScrAApe(success)
    result = scrape.register(schedule)
    return result