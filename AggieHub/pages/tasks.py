# import os
# import sys

# path = os.getcwd()
# parent = os.path.dirname(path)

# print(f'{parent}/AggieHub/pages/')
# sys.path.insert(0, f'{parent}/pages/')

# from scrAApe import *
from .scrAApe import *

success = None


## uses the ScrAApe function to authenticate the user with the given banner and pin
#@param banner The student's banner ID
#@param pin The student's PIN
#@return True if the student was successfully authenticated, False otherwise
def task1(banner, pin):
    global success
    success = Authenticate(banner, pin)
    return success.auth


## uses the authenticated session and the ScrAApe function to get the terms from Aggie Access
#@return A dictionary of term code: term name key value pairs
def task2():
    global success
    scrape = ScrAApe(success)
    terms = scrape.get_terms()
    return terms

## uses the authenticated session and the ScrAApe function to get the subjects from Aggie Access based on the term selected by the user
#@param term The term code selected by the user
#@return A list of subjects for the given term
def task3(term):
    global success
    scrape = ScrAApe(success)
    subjects = scrape.get_subject(term)
    return list(subjects.keys())

## uses the authenticated session and the ScrAApe function to get the courses from Aggie Access based on the subject selected by the user
#@param subject The subject selected by the user
#@return A dictionary of course id: course name key value pairs
def task4(subject):
    global success
    scrape = ScrAApe(success)
    courses = scrape.get_course(subject)
    return courses

## uses the authenticated session and the ScrAApe function to get the sections from Aggie Access based on the course selected by the user
# @param course The course selected by the user
# @return A dictionary containing all available section(s) data for the given course
def task5(course):
    global success
    scrape = ScrAApe(success)
    sections = scrape.get_section(course)
    return sections

## uses the authenticated session and the ScrAApe function to get the profile data from Aggie Access
#@return A dictionary containing all available profile data for the student
def task6():
    global success
    scrape = ScrAApe(success)
    profile = scrape.get_profile()
    return profile

## uses the authenticated session and the ScrAApe function to register the student for the given schedule
#@param schedule The student's registration PIN, selected term, and list of section(s) to be registered for
#@return A dictionary containing the results of the registration
def task7(schedule):
    global success
    scrape = ScrAApe(success)
    result = scrape.register(schedule)
    return result