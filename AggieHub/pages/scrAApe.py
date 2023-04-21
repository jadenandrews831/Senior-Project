#!/usr/bin/env python3

'''
assoc_term_in=dummy&crn=dummy&start_date_in=dummy&end_date_in=dummy&rsts=dummy&subj=dummy&crse=dummy&sec=dummy&levl=dummy&gmod=dummy&cred=dummy&title=dummy&mesg=dummy&regs_row=0&wait_row=0&add_row=10&TERM_IN=202340&sel_crn=dummy&assoc_term_in=dummy&ADD_BTN=dummy&sel_crn=40811+202340&assoc_term_in=202340&ADD_BTN=Register
'''

import argparse
import os
import pickle
import shelve
import dbm.dumb
import re

from getpass import getpass
from requests import Session
from bs4 import BeautifulSoup as bs

NCAT_URI = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_ValLogin'
rsrc_choices = ['term', 'subject', 'course', 'section', 'time', 'instructor', 'loc', 'crn', 'profile', 'session', 'register']

def debug_decorator(func):
  def inner(*args, **kwargs):
    print(">"*8+func.__name__+'() DEBUG BEGS'+"<"*8)
    data = func(*args, **kwargs)
    print(">"*8+func.__name__+'() DEBUG ENDS'+"<"*8)
    return data

  return inner

@debug_decorator
def file_to_dict(filename):
  """
  file_to_dict: returns encoded file as dictionary
  file format - key1:value1, key2:value2,...
  """
  with open(filename, 'rb') as file:
    data = file.readlines()
    d = {}
    for line in data:
      d.update(dict(sub.split(':') for sub in line.decode().split(',')))

    print('d >>>',d)
    return d
  

class User_Profile():
  """
  
  """
  def __init__(self):
    self.first = '*'
    self.last = '*'
    self.classification = '*'
    self.dept = '*'
    self.banner = '*'
    self.major = '*'
    self.advisor = '*'
    self.college = '*'
    print('New Profile Created')

  def add_headers(self, headers):
    self.headers_ = headers

  def set_name(self, first, last):
    self.first = first
    self.last = last

  def set_class(self, classification):
    self.classification = classification

  def set_dept(self, dept):
    self.dept = dept

  def set_banner(self, banner):
    self.banner = banner

  def set_major(self, major):
    self.major = major

  def __str__(self):
    return f"""
>>>User_Profile Object<<<
 Name: {self.first} {self.last}
 Class: {self.classification}
 Dept: {self.dept}   
 Major: {self.major}
 Banner: {self.banner}
 Major: {self.major}
 Advisor: {self.advisor}
 College: {self.college}
 {self.headers_ if hasattr(self, 'headers_') else ""}
 {self.scts_ if hasattr(self, "scts_") else ""}
>>>User_Profile Object<<<

    """
  
class Authenticate():
  """
  Authenticate: Creates a session with Aggie Access and logs in to the Main Menu.

  Parameters
  __________
  usrnme: string - the SID passed to the server
  psswd: string (int-like) - the PIN passed to the server
  session: requests.Session - the current with Aggie Access

  Attributes
  ____________
  # cookies_ : dictionary - stores the cookies for the current session

  """

  # @debug_decorator
  def __init__(self, usrnme, psswd):
    self.usrnme = usrnme
    self.psswd = psswd
    self.session = Session()
    self.auth = self.login(NCAT_URI)       # is the session authenticatd

  # @debug_decorator
  def login(self, uri):
    self.profile_ = User_Profile()
    self.site_ = self.session.get(uri)
    print('DEBUG >>> Session Cookies: ', self.session.cookies.get_dict())
    self.cookies_ = self.session.cookies.get_dict()
    login_data = {"sid":self.usrnme, 'PIN':self.psswd}
    response = ScrAApe(self).post_request(uri, login_data, 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_WWWLogin')
    self.cookies_ = self.session.cookies.get_dict()
    url, status = self.verify(response)
    self.profile_.set_banner(self.usrnme)

    return url

  # @debug_decorator
  def format_cookies(self, dic):
    s = ''.join([f'{key}={val};' for key, val in dic.items()])
    return s 
  
  # @debug_decorator
  def verify(self, response):
    '''
    '''
    self.print_headers(response)
    print(self.cookies_)
    print(response.status_code)
    print(response.text)
    # FIXME: add logic here for successful and unsuccessful logins
    soup = bs(response.content, 'html.parser')
    url = soup.meta['content']          # url for second page after authentication FIXME: make this a regex
    print(url)
    return (True, response.status_code) if url == "0;url=/pls/NCATPROD/bzwkrvtrns.p_display_revtrans_from_login" else (False, response.status_code)

  def print_headers(self, response):
    for header, val in response.headers.items():
      print(f'{header}: {val}')

  def __str__(self):
    return f"""Authenticate Object:
  self.usrnme = {self.usrnme}
  self.psswd = {self.psswd}
  self.session = {self.session}
  self.__dict__ = {self.__dict__}
    """

  # pickle data for ScrAApe and database use
  @debug_decorator
  def save_data(self, shelve_name):
    with shelve.open(shelve_name, 'n') as file:
      for key, val in self.__dict__.items():
        file[key] = val
      print("Saved Data:")
    with shelve.open(shelve_name, 'r') as file:
      print("Printing saved data:")
      for key, val in file.items():
        print(key,':', val)
    print(f"Session Created! Saved to >>> {shelve_name}")

    # conn = None
    # try:
    #   conn = sqlite3.connect(db_name)
    #   print(sqlite3.version)
    # except sqlite3.Error as e:
    #   print(e)
    # finally:
    #   if conn:
    #     conn.close()

    
      
    return file

  def load_data(self, auth):
    print("Loading Data: ")
    for key, val in auth.items():
      print(key, val)
      setattr(self, key, val)

    return self
  
class ScrAApe():
  """
  ScrAApe: scrape data from aggie access with the authenticated session.

  post request for 'SELECT A TERM'
  call_proc_in=bwskfcls.p_disp_dyn_ctlg&cat_term_in=202330
    - bwskfcls.p_disp_dyn_ctlg : the name of the resource retrieved at the 

  Parameters
  __________
  auth: Authenticate - authenticated session with aggie access
  scraped: list - scraped data from previous requests

  Attributes
  __________
  get_terms: dict - gets a list of school terms from aggie access
  get_subject:  dict - posts data from user, then gets the choices of subject

  """

  def __init__(self, auth):
    self.auth = auth

  def update_cookies(self, response):
    print("Response Headers: ", response.headers.items())
    try:
      self.auth.cookies_['SESSID'] = dict(response.headers.items())['Set-Cookie'].split('=')[1]
      print("Cookies: ", self.auth.cookies_)
    except:
      print('Didn\'t find Set-Cookie >> ', response.headers.items())
      print('Session was not Authenticated. Please Authenticate before trying again')
      exit(0)
    print('cookies >>> ',self.auth.cookies_)

  # @debug_decorator
  def get_data(self, uri, data, sel, attr, referrer=None):
    if referrer:
      response = self.post_request(uri, data, referrer)
    else:
      response = self.post_request(uri, data)
    print(response.text)
    self.auth.prev_site_ = uri
    content = response.text
    self.update_cookies(response)
    soup = bs(content, 'html.parser')
    select = soup.find(sel, attr)

    return select, soup

  # @debug_decorator
  def get_all_data(self, uri, data, sel, attr, referrer=None):
    if referrer:
      response = self.post_request(uri, data, referrer)
    else:
      response = self.post_request(uri, data)
    print(response.text)
    self.auth.prev_site_ = uri
    content = response.text
    self.update_cookies(response)
    soup = bs(content, 'html.parser')
    select = soup.find_all(sel, attr)

    return select, soup
  # Finish-Me
  def get_description(self):
    pass

  def register(self, pkg):


    #pkg changed to crns since you can register right from here: https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfreg.P_AltPin
    term, pin, crns = pkg[0], pkg[1], pkg[2]
    print("Term:", term)
    print("Pin:", pin)
    print("CRNs:")
    for crn in crns:
      print(crn, end=", ")
    print()

    # Select Term to Register For
    term_page_uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfreg.P_AltPin'
    select, soup = self.get_data(term_page_uri, {'term_in':term}, 'OPTION', {'VALUE': term}, term_page_uri)
    print("finished select term to register for")

    # Enter Pin for Registration
    chk_pin_uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfreg.P_CheckAltPin'
    crn_in, soup = self.get_all_data(chk_pin_uri, {'pin':pin}, 'input', {'name': 'CRN_IN', 'value': re.compile(r"\d{5}")}, term_page_uri)
    assoc_term_in = [x['value'] for x in soup.find_all('input', {'name': 'assoc_term_in'})]
    start_date_in = [x['value'] for x in soup.find_all('input', {'name': 'start_date_in'})]
    end_date_in = [x['value'] for x in soup.find_all('input', {'name': 'end_date_in'})]
    SUBJ = [x['value'] for x in soup.find_all('input', {'name': 'SUBJ'})]
    CRSE = [x['value'] for x in soup.find_all('input', {'name': 'CRSE'})]
    TITLE = [x['value'] for x in soup.find_all('input', {'name': 'TITLE'})]
    RSTS_IN = [x['value'] for x in soup.find_all('input', {'name': 'RSTS_IN'})]
    LEVL = [x['value'] for x in soup.find_all('input', {'name': 'LEVL'})]
    SEC = [x['value'] for x in soup.find_all('input', {'name': 'SEC'})]
    CRED = [x['value'] for x in soup.find_all('input', {'name': 'CRED'})]
    GMOD = [x['value'] for x in soup.find_all('input', {'name': 'GMOD'})]
    assoc_term_in = [x['value'] for x in soup.find_all('input', {'name': 'assoc_term_in'})]
    print("finished enter pin")
    for cel in crn_in:
      crns.append(cel['value'])
    print("crns", crns)
    RSTS_IN.extend([""*len(crn_in)])


    # Register with Given CRNs
    """
    term_in=202340&RSTS_IN=DUMMY&assoc_term_in=DUMMY&CRN_IN=DUMMY&start_date_in=DUMMY&
    end_date_in=DUMMY&SUBJ=DUMMY&CRSE=DUMMY&SEC=DUMMY&LEVL=DUMMY&CRED=DUMMY&GMOD=DUMMY&
    TITLE=DUMMY&MESG=DUMMY&REG_BTN=DUMMY&MESG=DUMMY&RSTS_IN=&assoc_term_in=202340&CRN_IN=40811&
    start_date_in=06%2F29%2F2023&end_date_in=08%2F04%2F2023&SUBJ=CST&CRSE=460&SEC=04A&LEVL=Undergraduate&
    CRED=++++3.000&GMOD=Standard+Letter+Grade&TITLE=System+Integra+and+Architec&RSTS_IN=RW&
    CRN_IN=40991&assoc_term_in=&start_date_in=&end_date_in=&RSTS_IN=RW&CRN_IN=&assoc_term_in=&
    start_date_in=&end_date_in=&RSTS_IN=RW&CRN_IN=&assoc_term_in=&start_date_in=&end_date_in=&
    RSTS_IN=RW&CRN_IN=&assoc_term_in=&start_date_in=&end_date_in=&RSTS_IN=RW&CRN_IN=&assoc_term_in=&
    start_date_in=&end_date_in=&RSTS_IN=RW&CRN_IN=&assoc_term_in=&start_date_in=&end_date_in=&RSTS_IN=RW&
    CRN_IN=&assoc_term_in=&start_date_in=&end_date_in=&RSTS_IN=RW&CRN_IN=&assoc_term_in=&start_date_in=&
    end_date_in=&RSTS_IN=RW&CRN_IN=&assoc_term_in=&start_date_in=&end_date_in=&RSTS_IN=RW&CRN_IN=&
    assoc_term_in=&start_date_in=&end_date_in=&regs_row=1&wait_row=0&add_row=10&REG_BTN=Submit+Changes
    """

    reg_page_uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwckcoms.P_Regs'
    lst = ['DUMMY']
    crns.extend(['']*(10-len(crn_in)))
    lst.extend(crns)
    reg_data = {'term_in':term, 'RSTS_IN':RSTS_IN, 'assoc_term_in':assoc_term_in,
            'start_date_in':start_date_in, 'end_date_in':end_date_in, 'SUBJ':SUBJ, 'CRSE':CRSE, 
            'SEC':SEC, 'LEVL':LEVL, 'CRED':CRED, 'CRN_IN': lst, 
            'GMOD':GMOD, 'TITLE':TITLE, 'MESG':'DUMMY', 'regs_row':'1', 
            'assoc_term_in':assoc_term_in, 'wait_row':'0', 'add_row':'10','REG_BTN':['DUMMY', 'Submit Changes'],
            }
    
    # FIND: <table  CLASS="datadisplaytable" SUMMARY="Current Schedule">
    cur_sch, soup = self.get_data(reg_page_uri, reg_data, 'table', {'SUMMARY': 'Current Schedule'}, referrer=chk_pin_uri) 
    # AND GET: <input name="?" />, ?=CRN_IN,SUBJ,CRSE,SEC,LEVL,CRED,GMOD,TITLE
    soup_cp = soup
    print("soup_cp", soup_cp)
    cur = list()
    acpt = dict()
    for tag in ["CRN_IN","SUBJ","CRSE","SEC","LEVL","CRED",'GMOD','TITLE']:
      acpt[tag] = list()
      t = soup.find_all('input', {'name':tag, 'value':re.compile(r".*")})
      for i in t:
        if i['value'] == 'DUMMY': continue
        acpt[tag].append(i['value'])
    # THEN FIND: <table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present Registration Errors.">
    soup = soup_cp
    err_sch = soup.find('table', {"summary": re.compile(r".*Registration Errors.*")})
    print(err_sch)
    # AND GET: <td CLASS="dddefault">
    soup = bs(str(err_sch), 'html.parser')
    err = list()
    rgct = dict()
    j = 0
    for info in soup.find_all('td', {'class':'dddefault'}):
      i = info.text
      err.append(i)
      j += 1
      if j%6 == 5:
        rgct[str(len(rgct))] = err
        err = list()
        j = 0
      
    
    # RETURN: {unknown} // {Class CRNs with registration issues, Class CRNS without registration issues, Full Confirmation}
    print("finished registration")
    pkg = dict()
    i = 0
    for attr in (acpt, rgct, bool(not err)):
      pkg[str(i)] = attr
      i += 1
    print('pkg:',pkg)
    return pkg
    


  # Finish-Me
  def get_profile(self):
    uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskgstu.P_StuInfo'
    response = self.post_request(uri, {'term_in': '202410'}, referer=uri)   #make termin dynamic
    content = response.text

    soup = bs(content, 'html.parser')
    name = soup.find('div', {'class': 'staticheaders'})
    keys = soup.find_all('th', {'class': 'ddlabel'}) # get profile name, banner, and term
    vals = soup.find_all('td', {'class': 'dddefault'})

    self.auth.profile_.first = ''.join(name.text.split()[1])
    self.auth.profile_.last = ''.join(name.text.split()[3])
    
    for key, val in zip(keys, vals):
      if key.text == 'Class:':
        self.auth.profile_.classification = val.text

      elif key.text == 'Major and Department:':
        self.auth.profile_.major = ''.join(val.text.split(',')[0])
        self.auth.profile_.dept = ''.join(val.text.split(',')[1])

      elif key.text == 'Primary Advisor:':
        self.auth.profile_.advisor = ''.join(val.text)

      elif key.text == 'College:':
        self.auth.profile_.college = ''.join(val.text)

      else:
        setattr(self.auth.profile_, key.text, val.text)
    
    return self.auth.profile_

  def get_terms(self, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.p_sel_crse_search'):
    print("uri", uri)
    self.auth.prev_site_ = uri
    response = self.auth.session.get(uri, headers={'Host': 'ssbprod-ncat.uncecs.edu', 
                                                    'Cookies': self.auth.format_cookies(self.auth.cookies_),
                                                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
                                                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                                    'Accept-Language': 'en-US,en;q=0.5',
                                                    'Accept-Encoding': 'gzip, deflate',
                                                    'Upgrade-Insecure-Requests': '1',
                                                    'Sec-Fetch-Dest': 'document',
                                                    'Sec-Fetch-Mode': 'navigate', 
                                                    'Sec-Fetch-Site': 'same-origin',
                                                    'Te': 'trailers',
                                                    'Connection': 'close'})
    content = response.text
    self.update_cookies(response)
    #print(auth)
    soup = bs(content, 'html.parser')
    select = soup.find('select', {'name': 'p_term'})
    s = soup.find('div', {'class':'staticheaders'})
    banner, first, last = s.text.split()[0], s.text.split()[1], s.text.split()[3]
    self.auth.profile_.banner, self.auth.profile_.first, self.auth.profile_.last = banner, first, last
    terms = select.findChildren()[1:6]
    terms_w_codes = {}
    for term in terms: terms_w_codes[term.text] = term.get('value') 
    print('terms_w_codes: ', terms_w_codes)

    self.auth.terms_w_codes_ = terms_w_codes
    return terms_w_codes
  
  # data should be selected term from get_terms()
  # @debug_decorator
  def get_subject(self, data=None, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwckgens.p_proc_term_date'):
    """
    get_subject: 

    Parameters
    __________
    data: dict - data to be posted
    """
    if not data:
      data = input("Data: ")
    if self.auth.terms_w_codes_:
      self.auth.pterm = self.auth.terms_w_codes_[data]
      print("Code:",self.auth.pterm)
    else:
      print('Needs a valid term')
      return
    
    select, soup = self.get_data(uri, {'p_calling_proc':'P_CrseSearch', 'p_term':self.auth.pterm, 'p_by_date':'Y','p_from_date':'','p_to_date':''}, 'select', {'name': 'sel_subj'})
    print("Select: ", select, soup)
    subjs = select.findChildren()
    subjs_w_codes = {}
    for subj in subjs: subjs_w_codes[subj.text] = subj.get('value')
    print('subjs_w_codes', subjs_w_codes)

    self.auth.subjs_w_codes = subjs_w_codes
    return subjs_w_codes

  # @debug_decorator
  def get_course(self, data=None, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.P_GetCrse'):
    """
    get_course:

    Parameters
    __________
    """
    if not data:
      data = input("Data: ")
    if self.auth.subjs_w_codes:
      self.auth.pcode = self.auth.subjs_w_codes[data]
      ptrm = self.auth.pterm
    else:
      print('Needs a valid term')
      return

    data = {'rsts':'dummy', 'crn':'dummy','term_in':self.auth.pterm, 'sel_subj':['dummy', self.auth.pcode],
            'sel_day':'dummy', 'sel_schd':'dummy', 'sel_insm':'dummy', 'sel_camp':'dummy', 
            'sel_levl':'dummy', 'sel_sess':'dummy', 'sel_instr':'dummy', 'sel_ptrm':['dummy', '%'], 
            'sel_attr':'dummy', 'sel_crse':'', 'sel_title':'', 'sel_from_cred':'',
            'sel_to_cred':'', 'begin_hh':'0', 'begin_mi':'0', 'end_hh':'0',
            'end_mi':'0','begin_ap':'x', 'end_ap':'y', 'path':'1','SUB_BTN':'Course Search'
            }

    select, soup = self.get_all_data(uri, data, 'td', {'bypass_esc': 'Y'})
    heads = self.get_inputs(soup)
    self.auth.profile_.add_headers(heads)

    crss = select[1::2]
    cds = select[0::2]

    self.auth.crss_ = {}

    for crs, cd in zip(crss, cds): 
      self.auth.crss_[cd.text] = crs.text

    print(self.auth.crss_)

    return self.auth.crss_
  
  def get_inputs(self, soup):
    heads = {}
    for head in soup.find_all('form', {'action': '/pls/NCATPROD/bwskfcls.P_GetCrse'}):
      l = head.find_all('input')
      for i in l:
        if i.attrs['name'] in heads.keys() : 
            if type(heads[i.attrs['name']]) == list:
              if i.attrs['value'] not in heads[i.attrs['name']]:
                heads[i.attrs['name']] = heads[i.attrs['name']].extend(i.attrs['value'])
            elif not i.attrs['value'] == heads[i.attrs['name']]:
              heads[i.attrs['name']] = [heads[i.attrs['name']], i.attrs["value"]]
        else: heads[i.attrs['name']] = i.attrs["value"]
    for i in heads:
      print(i)
      print()
    print("Heads: ", heads)
    print("Saved Heads")
    return heads

  # @debug_decorator
  def get_section(self, data=None, uri='https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.P_GetCrse'):
    """
    get_section:

    Parameters
    __________
    """
    if not data:
      data = input("Course: ")
    if self.auth.crss_:
      self.auth.crs = data
      print('Crs:',self.auth.crs)
    else:
      print('Needs a valid term')
      return
    
    print(self.auth)

    
    self.auth.profile_.headers_['SEL_CRSE'] = data
    print(self.auth.profile_.headers_)
    self.auth.profile_.scts_ = []
    
    headers, soup = self.get_all_data(uri, self.auth.profile_.headers_, 'th', {'class': "ddheader"})
    print("Headers: ", headers)
    vals = soup.find_all('td', {'class': "dddefault"})
    print('Vals:', vals)
    self.auth.profile_.scts_ = list()
    for i in range(len(vals) // 23):
      sect_data = vals[i*23:i*23+23]
      for s in sect_data: print(s.text)
      s = dict()
      for d, h in zip(sect_data, headers): 
        s[h.text] = d.text
      self.auth.profile_.scts_.append(s)

    print('Sections:')
    print(self.auth.profile_.scts_)

    self.response_ = self.auth.session.get('https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwckschd.p_disp_listcrse', 
                                            params={'term_in':self.auth.pterm,'crse_in':self.auth.crs,
                                                 'crn_in':self.auth.profile_.scts_[0]['CRN'], 'subj_in':self.auth.pcode}, 
                                            headers={
                                              'Host': 'ssbprod-ncat.uncecs.edu', 
                                              'Cookies': self.auth.format_cookies(self.auth.cookies_),
                                              'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
                                              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                              'Accept-Language': 'en-US,en;q=0.5',
                                              'Accept-Encoding': 'gzip, deflate',
                                              'Content-Type': 'application/x-www-form-urlencoded',
                                              'Orgin': 'https://ssbprod-ncat.uncecs.edu',
                                              'Referer': uri,
                                              'Upgrade-Insecure-Requests': '1',
                                              'Sec-Fetch-Dest': 'document',
                                              'Sec-Fetch-Mode': 'navigate', 
                                              'Sec-Fetch-Site': 'same-origin',
                                              'Sec-Fetch-User': '?1',
                                              'Te': 'trailers',
                                              'Connection': 'close'})
    
    
    print('Description:')
    print(self.response_.text)

    soup = bs(self.response_.text, 'html.parser')
    print('Soup:', soup)
    select = soup.find('td', {'class':'dddefault'})
    print('Select:')
    print(select)
    self.auth.profile_.scts_[0]['description'] = select.text.split('\n\n')[0]

    print('Description:')
    print(self.auth.profile_.scts_[0]['description'])
    return self.auth.profile_.scts_

  def post_request(self, uri, data, referer=None):
    """
    post_request: takes an authenticated session, and posts data to the given uri
    """
    if not referer: referer = self.auth.prev_site_
    print('>'*8+'post_request() DEBUG STARTS'+'<'*8)
    print('Cookies:', self.auth.cookies_)
    self.response_ = self.auth.session.post(uri, data=data, headers={'Host': 'ssbprod-ncat.uncecs.edu', 
                                                    'Cookies': self.auth.format_cookies(self.auth.cookies_),
                                                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
                                                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                                    'Accept-Language': 'en-US,en;q=0.5',
                                                    'Accept-Encoding': 'gzip, deflate',
                                                    'Content-Type': 'application/x-www-form-urlencoded',
                                                    'Orgin': 'https://ssbprod-ncat.uncecs.edu',
                                                    'Referer': referer,
                                                    'Upgrade-Insecure-Requests': '1',
                                                    'Sec-Fetch-Dest': 'document',
                                                    'Sec-Fetch-Mode': 'navigate', 
                                                    'Sec-Fetch-Site': 'same-origin',
                                                    'Sec-Fetch-User': '?1',
                                                    'Te': 'trailers',
                                                    'Connection': 'close'})
    print(self.response_.text)
    
    
    print("Request BODY:", self.response_.request.headers)
    print("Request HEADERS:")
    for pair in self.response_.request.body.split('&'):
      print(pair.split('='))
    for header, item in self.response_.headers.items():
      print(header,':', item)
    print('>'*8+'post_request() DEBUG ENDS'+'<'*8+'\n')
    return self.response_
  
  def __str__(self):
    return f"""ScrAApe Object:
  prev_site = {self.auth.prev_site}
  cookies = {self.auth.cookies_}
  self.__dict__{self.__dict__}
    """
  
if __name__ == "__main__":
  """
  Usage
  ______
    scrAApe.py                                                                                          # authenticate a session manually, then serialize it for future use
    scrAApe.py auth -d .shadow                                                                          # authenticate to Aggie Access with credentials from a protected file
    scrAApe.py auth -u <username> -p <pin>                                                              # authenticate to Aggie Access with a given username and password
    scrAApe.py get {term, subject} .<username>-sess.pickle                                              # get data from a given uri in a pickled session
    scrAApe.py post {term, subject} <datafile> .<username>-sess.pickle                                   # post data to the given uri from a pickled session
  """  

  parser = argparse.ArgumentParser(prog="scrAApe", description='The Aggie Access Authenticator and Web Scraper')

  subparser = parser.add_subparsers(dest="command")
  authenticate = subparser.add_parser('auth', help="option to authenticate. Either use credentials or '.shadow'")
  get = subparser.add_parser('get', help="get data from the given uri")
  register = subparser.add_parser('register', help="post data to the given uri")

  group = authenticate.add_mutually_exclusive_group()
  group.add_argument('-d', '--destfile', type=str, help='file where login credentials are located')
  subgroup = group.add_argument_group()
  subgroup.add_argument('-u', '--username', type=str, help="Aggie Access SID (Student ID)")
  subgroup.add_argument('-p', '--pin', type=str, help='Aggie Access Pin')

  get.add_argument('resource', type=str, help='target resource type {term, subject,...}', choices=rsrc_choices)
  get.add_argument('session', type=str, help='session file address')
  
  register.add_argument('-d', '--destfile', type=str, help='file where login credentials are located')
  # register.add_argument('data', type=str, help="data file with data to be posted to target")
  # register.add_argument('session', type=str, help='session file address')

  args = parser.parse_args()

  if not args.command:
    parser.print_help()
    print('Aggie Access Authenticator\n')
    sid = input('SID: ')
    pin = getpass('PIN: ')
    a = Authenticate(sid, pin)
    a.login(NCAT_URI)

    shelve_name = f'.{sid}-sess.db'
    a.save_data(shelve_name)

  if args.command == 'auth':
    if args.destfile:
      d = list(file_to_dict(args.destfile).items())[0]
      sid = d[0]
      pin = d[1]
      a = Authenticate(sid, pin)

      shelve_name = f'.{sid}-sess.db'
      a.save_data(shelve_name)
    elif args.username and args.pin:
      sid = args.username
      pin = args.pin
      a = Authenticate(sid, pin)

      shelve_name = f'.{sid}-sess.db'
      a.save_data(shelve_name)
    else:
      print('Hmm... something went wrong')
      print(args)

  if args.command == 'get':
    if args.resource and args.session:
      rsrc = args.resource
      sess = args.session
      a = shelve.open(sess)
      print("Opening Authenticate Shelf:")
      for key, val in a.items():
        print(key, ":", val)
      try:
        auth = Authenticate(a['usrnme'], a['psswd']).load_data(a)
        a.close()
      except:
        print("Unable to create Authenticate Object. Check Session")
        exit()

      scrape = ScrAApe(auth) # close the file
      
      if args.resource == 'term':
        # profile = scrape.get_profile()
        terms = scrape.get_terms()

      if args.resource == 'subject':
        subjs = scrape.get_subject()

      if args.resource == 'course':
        crss = scrape.get_course()

      if args.resource == 'section':

        scts = scrape.get_section()

      if args.resource == 'session':
        print("Printing")
        print(scrape.auth)

      if args.resource == 'profile':
        prf = scrape.get_profile()

      

      shelve_name = f'.{auth.usrnme}-sess.db'
      auth.save_data(shelve_name)


    else:
      print('Hmm... something went wrong')
      print(args)

  elif args.command == 'register':
    if args.destfile:
      d = list(file_to_dict(args.destfile).items())[0]
      sid = d[0]
      pin = d[1]
      a = Authenticate(sid, pin)
      print(a)
      pkg = (input('Term:'), input('Pin:'), ['40991', ])
      scrape = ScrAApe(a) # close the file
      reg = scrape.register(pkg)

    else:
      print('Hmm... something went wrong')
      print(args)


 