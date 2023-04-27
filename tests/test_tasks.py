import os
import sys

path = os.getcwd()
parent = os.path.dirname(path)

sys.path.insert(0, f'{parent}/AggieHub/pages/')

import tasks

def test_task_4():
  subjs = {'Accounting': 'ACCT', 'Agribusiness Management': 'ABM', 'Agricultural': 'AGRI', 'Agricultural Education': 'AGED', 'Animal Science': 'ANSC', 'Applied Engineering Technology': 'AET', 'Applied Science and Tech': 'AST', 'Atmospheric Sci & Meteorology': 'ASME', 'Biology': 'BIOL', 'Biomedical Engineering': 'BMEN', 'Business Analytics': 'BUAN', 'Business Info Tech': 'BTEC', 'Chemical Engineering': 'CHEN', 'Chemistry': 'CHEM', 'Computational Sci & Engineer': 'CSE', 'Computer Graphics Technology': 'CGT', 'Computer Systems Technology': 'CST', 'Construction Management': 'CM', 'Counseling': 'COUN', 'Criminal Justice': 'CRJS', 'Curriculum & Instruction': 'CUIN', 'Dissertation': 'DISU', 'Economics': 'ECON', 'Educator Preparation': 'EDPR', 'Electrical & Computer Engineer': 'ECEN', 'English': 'ENGL', 'Environmental Health & Safety': 'EHS', 'Environmental Studies': 'ENVS', 'Family and Consumer Sciences': 'FCS', 'Finance': 'FIN', 'French': 'FREN', 'Freshman Studies': 'FRST', 'General Engineering': 'GEEN', 'Geography': 'GEOG', 'Graduate Thesis Cont': 'GRAD', 'Health & Physical Education': 'HPED', 'History': 'HIST', 'Industrial Systems Engineering': 'ISEN', 'Journalism & Mass Communicatio': 'JOMC', 'Kinesiology': 'KINS', 'Liberal Studies': 'LIBS', 'Management': 'MGMT', 'Marketing': 'MKTG', 'Mathematics': 'MATH', 'Mechanical Engineering': 'MEEN', 'Music': 'MUSI', 'Nanoengineering': 'NANO', 'Natural Resources': 'NARS', 'Nursing': 'NURS', 'Philosophy': 'PHIL', 'Physics': 'PHYS', 'Political Science': 'POLI', 'Psychology': 'PSYC', 'Social Work': 'SOWK', 'Spanish': 'SPAN', 'Special Education': 'SPED', 'Speech': 'SPCH', 'Supply Chain Management': 'SCMG'}
  assert tasks.task4('Summer II 2023') == subjs

def test_task_5():
  crss = {'222': 'Principles of Accounting II', '332': 'Intermediate Accounting II'}
  assert tasks.task5('Accounting') == crss

def test_task_6():
  scts = [{'Select': 'C', 'CRN': '40696', 'Subj': 'ACCT', 'Crse': '222', 'Sec': '04A', 'Cmp': 'DL', 'Cred': '3.000', 'Title': 'Principles of Accounting II', 'Days': '\xa0', 'Time': 'TBA', 'Cap': '35', 'Act': '35', 'Rem': '0', 'WL Cap': '0', 'WL Act': '0', 'WL Rem': '0', 'XL Cap': '0', 'XL Act': '0', 'XL Rem': '0', 'Instructor': 'Stephen T  Peoples (P)', 'Date (MM/DD)': '06/29-08/04', 'Location': 'TBA', 'Attribute': 'Interdisc Business Studies', 'description': "\nThis course is a continuation of Principles of Accounting I.\nThe first part of the course covers financial accounting\ntopics including long-term liabilities, stockholders'\nequity, investments, statement of cash flows, and financial\nstatement analysis.  The remainder of the course covers\nbasic managerial accounting concepts such as job order and\nprocess costing, cost allocation, cost-volume profit\nanalysis, and budgeting.  Prerequisites:  C or above in\nACCT 221.  (F;S;SS)"}, {'Select': 'C', 'CRN': '40912', 'Subj': 'ACCT', 'Crse': '222', 'Sec': '04B', 'Cmp': 'DL', 'Cred': '3.000', 'Title': 'Principles of Accounting II', 'Days': '\xa0', 'Time': 'TBA', 'Cap': '35', 'Act': '35', 'Rem': '0', 'WL Cap': '0', 'WL Act': '0', 'WL Rem': '0', 'XL Cap': '0', 'XL Act': '0', 'XL Rem': '0', 'Instructor': 'Stephen T  Peoples (P)', 'Date (MM/DD)': '06/29-08/04', 'Location': 'TBA', 'Attribute': 'Interdisc Business Studies'}]
  assert tasks.task6('222') == scts

def test_task_7():
  reg = {'0': {'CRN_IN': [], 'SUBJ': [], 'CRSE': [], 'SEC': [], 'LEVL': [], 'CRED': [], 'GMOD': [], 'TITLE': []}, '1': [['This section is full . Please select a different section.', '40696', 'ACCT', '222', '04A', 'Undergraduate', '    3.000', 'Standard Letter Grade', 'Principles of Accounting II']], '2': True}
  pkg = (input('Term:'), input('Pin:'), [ '40696', ])
  assert tasks.task7(pkg) == reg, "Make Sure No Classes Have Been Registered For Already."