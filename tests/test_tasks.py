import os
import sys

path = os.getcwd()
parent = os.path.dirname(path)

sys.path.insert(0, f'{parent}/AggieHub/pages/')
import tasks, scrAApe

def test_task_1():
    if (os.path.exists('.shadow')):
        d = list(scrAApe.file_to_dict('.shadow').items())[0]
        banner = d[0]
        pin = d[1]
    assert tasks.task1(banner, pin) == True
    
def test_task_2():
    assert tasks.task2() == {'Fall 2023': '202410', 'Summer II 2023': '202340', 'Summer I 2023': '202330', 'Spring 2023 (View only)': '202320', 'Fall 2022 (View only)': '202310'}

def test_task_3():
    assert tasks.task3('Summer II 2023') == ['Accounting', 'Adult Education', 'Aerospace Studies', 'Agribusiness Management', 'Agricultural', 'Agricultural Economics', 'Agricultural Ed Research', 'Agricultural Education', 'Animal Science', 'Applied Engineering Technology', 'Applied Science and Tech', 'Architectural Engineering', 'Art', 'Atmospheric Sci & Meteorology', 'Biological Engineering', 'Biology', 'Biomedical Engineering', 'Business Analytics', 'Business Info Tech', 'Business and Economics', 'Center for Academic Excellence', 'Chemical Engineering', 'Chemistry', 'Civil Engineering', 'Civil, Arch & Envir Engineer', 'Computational Sci & Engineer', 'Computer Graphics Technology', 'Computer Science', 'Computer Systems Technology', 'Construction Management', 'Cooperative Education', 'Counseling', 'Criminal Justice', 'Curriculum & Instruction', 'Dance', 'Dissertation', 'Economics', 'Educator Preparation', 'Electrical & Computer Engineer', 'Elementary Education', 'English', 'Environmental Health & Safety', 'Environmental Studies', 'Family and Consumer Sciences', 'Finance', 'French', 'Freshman Studies', 'General Engineering', 'Geography', 'Geomatics', 'Global Studies', 'Graduate Thesis Cont', 'Health & Physical Education', 'Health Communication', 'Health Services Management', 'History', 'Horticulture', 'Industrial Systems Engineering', 'Journalism & Mass Communicatio', 'Kinesiology', 'Laboratory Animal Science', 'Landscape Architecture', 'Leadership Studies', 'Liberal Studies', 'Management', 'Marketing', 'Masters Sch Administration/Exe', 'Masters School Administration', 'Mathematics', 'Mechanical Engineering', 'Military Science', 'Music', 'Nanoengineering', 'Natural Resources', 'Nursing', 'Philosophy', 'Physics', 'Political Science', 'Psychology', 'Social Work', 'Sociology', 'Sociology and Social Work', 'Soil Management', 'Soil Science', 'Spanish', 'Special Education', 'Speech', 'Sport Sci & Fitness Management', 'Statistics', 'Supply Chain Management', 'Systems Engineering', 'Theatre', 'Waste Management']
    
def test_task_4():
  crss = {'222': 'Principles of Accounting II', '332': 'Intermediate Accounting II'}
  assert tasks.task5('Accounting') == crss

def test_task_5():
  scts = [{'Select': 'C', 'CRN': '40696', 'Subj': 'ACCT', 'Crse': '222', 'Sec': '04A', 'Cmp': 'DL', 'Cred': '3.000', 'Title': 'Principles of Accounting II', 'Days': '\xa0', 'Time': 'TBA', 'Cap': '35', 'Act': '35', 'Rem': '0', 'WL Cap': '0', 'WL Act': '0', 'WL Rem': '0', 'XL Cap': '0', 'XL Act': '0', 'XL Rem': '0', 'Instructor': 'Stephen T  Peoples (P)', 'Date (MM/DD)': '06/29-08/04', 'Location': 'TBA', 'Attribute': 'Interdisc Business Studies', 'description': "\nThis course is a continuation of Principles of Accounting I.\nThe first part of the course covers financial accounting\ntopics including long-term liabilities, stockholders'\nequity, investments, statement of cash flows, and financial\nstatement analysis.  The remainder of the course covers\nbasic managerial accounting concepts such as job order and\nprocess costing, cost allocation, cost-volume profit\nanalysis, and budgeting.  Prerequisites:  C or above in\nACCT 221.  (F;S;SS)"}, {'Select': 'C', 'CRN': '40912', 'Subj': 'ACCT', 'Crse': '222', 'Sec': '04B', 'Cmp': 'DL', 'Cred': '3.000', 'Title': 'Principles of Accounting II', 'Days': '\xa0', 'Time': 'TBA', 'Cap': '35', 'Act': '35', 'Rem': '0', 'WL Cap': '0', 'WL Act': '0', 'WL Rem': '0', 'XL Cap': '0', 'XL Act': '0', 'XL Rem': '0', 'Instructor': 'Stephen T  Peoples (P)', 'Date (MM/DD)': '06/29-08/04', 'Location': 'TBA', 'Attribute': 'Interdisc Business Studies'}]
  assert tasks.task6('222') == scts


def test_task_6():
  scts = '''
>>>User_Profile Object<<<
 Name: Jaden Andrews
 Class: Senior
 Dept:  Computer Science   
 Major: Computer Science
 Banner: 950388894
 Major: Computer Science
 Advisor: Olusola T. Odeyomi
 College: College of Engineering
 
 
>>>User_Profile Object<<<

    '''
  scts_data = tasks.task6()
  print(scts_data)
  assert scts_data.__str__().split('\n') == str(scts).split('\n')

def test_task_7():
  reg = {'0': {'CRN_IN': [], 'SUBJ': [], 'CRSE': [], 'SEC': [], 'LEVL': [], 'CRED': [], 'GMOD': [], 'TITLE': []}, '1': [['This section is full . Please select a different section.', '40696', 'ACCT', '222', '04A', 'Undergraduate', '    3.000', 'Standard Letter Grade', 'Principles of Accounting II']], '2': True}
  pkg = (input('Term:'), input('Pin:'), [ '40696', ])
  assert tasks.task7(pkg) == reg, "Make Sure No Classes Have Been Registered For Already."