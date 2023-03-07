#!/usr/bin/env python3

import argparse
import os
import pickle

from getpass import getpass
from requests import Session
from bs4 import BeautifulSoup as bs

NCAT_URI = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_ValLogin'
rsrc_choices = ['term', 'subject', 'course', 'section', 'time', 'instructor', 'loc', 'crn', 'profile']

def file_to_dict(filename):
  """
  file_to_dict: returns encoded file as dictionary
  file format - key1:value1, key2:value2,...
  """
  print('>'*8+'file_to_dict() DEBUG STARTS'+'<'*8)
  with open(filename, 'rb') as file:
    data = file.readlines()
    d = {}
    for line in data:
      d.update(dict(sub.split(':') for sub in line.decode().split(',')))

    print('d >>>',d)
    print('>'*8+'file_to_dict() DEBUG ENDS'+'<'*8+'\n')
    return d
  

class User_Profile():
  """
  
  """
  def __init__(self):
    print('New Profile Created')

  def set_name(self, first, last):
    self.first_ = first
    self.last_ = last

  def set_class(self, classification):
    self.class_ = classification

  def set_dept(self, dept):
    self.dept_ = dept

  def set_banner(self, banner):
    self.banner_ = banner

  def set_major(self, major):
    self.major_ = major

  def __str__(self):
    return f"""
>>>User_Profile Object<<<
 Name: {self.first_} {self.last_}
 Class: {self.class_}
 Dept: {self.dept_}   
 Major: {self.major_}
 Banner: {self.banner_}
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

  def __init__(self, usrnme, psswd):
    self.usrnme = usrnme
    self.psswd = psswd
    self.session = Session()
    self.auth = self.login(NCAT_URI)       # is the session authenticatd
    print(self)
    
    #if logged in return true otherwise return false

  def login(self, uri):
    self.site_ = self.session.get(uri)
    print('>'*8+'login() DEBUG SECTION STARTS'+'<'*8)
    print('DEBUG >>> Session Cookies: ', self.session.cookies.get_dict())
    self.cookies_ = self.session.cookies.get_dict()
    login_data = {"sid":self.usrnme, 'PIN':self.psswd}
    response = ScrAApe(self).post_request(uri, login_data, 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_WWWLogin')
    self.cookies_ = self.session.cookies.get_dict()
    url, status = self.verify(response)
    print('>'*8+'login() DEBUG SECTION ENDS'+'<'*8+'\n')

    # page = self.session.get('https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfshd.P_CrseSchd')
    # print(page.content); print('\n'*3)
    return url

  def format_cookies(self, dic):
    s = ''.join([f'{key}={val};' for key, val in dic.items()])
    return s 
  
  def verify(self, response):
    '''
    <meta http-equiv="refresh" content="0;url=/pls/NCATPROD/bzwkrvtrns.p_display_revtrans_from_login">
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>

    '''
    print('>'*8+'verify() DEBUG SECTION STARTS'+'<'*8)
    for header, val in response.headers.items():
      print(f'{header}: {val}')
    print(self.cookies_)
    print(response.status_code)
    print(response.text)
    # FIXME: add logic here for successful and unsuccessful logins
    soup = bs(response.content, 'html.parser')
    url = soup.meta['content']          # url for second page after authentication FIXME: make this a regex
    print(url)
    print('>'*8+'verify() DEBUG SECTION ENDS'+'<'*8+'\n')
    return True if url == "0;url=/pls/NCATPROD/bzwkrvtrns.p_display_revtrans_from_login" else False, response.status_code

  # def get_dict(self):
  #   for key, val in self.__dict__.items():


  def __str__(self):
    return f"""Authenticate Object:
  self.usrnme = {self.usrnme}
  self.psswd = {self.psswd}
  self.session = {self.session}
  self.__dict__ = {self.__dict__}
    """
  
  # pickle data for ScrAApe and database use
  def save_data(self, pickle_name):
    with open(pickle_name, 'wb') as file:
      pickle.dump(self, file)
      print('>'*8+'save_data() DEBUG STARTS'+'<'*8)
      print(f"Session Created! Saved to >>> {pickle_name}")
      print('>'*8+'save_data() DEBUG ENDS'+'<'*8)

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
    print(response.headers.items())
    try:
      self.auth.cookies_['SESSID'] = dict(response.headers.items())['Set-Cookie'].split('=')[1]
    except:
      print('Didn\'t find Set-Cookie >> ', response.headers.items())
      print('Session was not Authenticated. Please Authenticate before trying again')
      exit()
    print('cookies >>> ',self.auth.cookies_)

  def get_profile(self, profile):
    print('>'*8+'get_profile() DEBUG SECTION STARTS'+'<'*8)
    uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskgstu.P_StuInfo'
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
    print(response.request.headers.items())
    print()
    print(response.headers.items())
    self.update_cookies(response)
    print(response.text)

  def get_terms(self, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.p_sel_crse_search'):
    print('>'*8+'get_terms() DEBUG STARTS'+'<'*8)
    if 'terms_w_codes_' in self.__dict__:
      print('get_terms(): found it!')
      print('>'*8+'get_term() DEBUG ENDS'+'<'*8+'\n')
      return self.terms_w_codes_
    print(uri)
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
    # print(response.request.headers.items())
    # print()
    # print(response.headers.items())
    # print(response.text)
    self.update_cookies(response)
    #print(auth)
    soup = bs(content, 'html.parser')
    select = soup.find('select', {'name': 'p_term'})
    terms = select.findChildren()[1:6]
    terms_w_codes = {}
    for term in terms: terms_w_codes[term.text] = term.get('value') 
    print('terms_w_codes', terms_w_codes)
    print('>'*8+'get_term() DEBUG ENDS'+'<'*8+'\n')

    self.auth.terms_w_codes_ = terms_w_codes
    return terms_w_codes
  
  # data should be selected term from get_terms()
  def get_subject(self, data=None, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwckgens.p_proc_term_date'):
    """
    get_subject: 

    Parameters
    __________
    data: dict - data to be posted
    """
    print('>'*8+'get_subject() DEBUG STARTS'+'<'*8)
    if not data:
      data = input("Data: ")
    if self.auth.terms_w_codes_:
      self.auth.pterm = self.auth.terms_w_codes_[data]
      print("Code:",self.auth.pterm)
    else:
      print('Needs a valid term')
      return
    
    response = self.post_request(uri, {'p_calling_proc':'P_CrseSearch', 'p_term':self.auth.pterm, 'p_by_date':'Y','p_from_date':'','p_to_date':''})
    self.auth.prev_site_ = uri
    content = response.text
    self.update_cookies(response)
    soup = bs(content, 'html.parser')
    select = soup.find('select', {'name': 'sel_subj'})
    print("Select: ", select, soup)
    subjs = select.findChildren()
    subjs_w_codes = {}
    for subj in subjs: subjs_w_codes[subj.text] = subj.get('value')
    print('subjs_w_codes', subjs_w_codes)

    print('>'*8+'get_subject() DEBUG ENDS'+'<'*8+'\n')

    self.auth.subjs_w_codes = subjs_w_codes
    return subjs_w_codes

  def get_course(self, data=None, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.P_GetCrse'):
    """
    get_course:

    Parameters
    __________
    """
    print('>'*8+'get_course() DEBUG STARTS'+'<'*8)
    if not data:
      data = input("Data: ")
    if self.auth.subjs_w_codes:
      code = self.auth.subjs_w_codes[data]
      ptrm = self.auth.pterm
      print('Code:',code)
    else:
      print('Needs a valid term')
      return
    
    '''
    rsts=dummy&crn=dummy&term_in=202330&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&
    sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&
    sel_subj=COMP&sel_crse=&sel_title=&sel_from_cred=&sel_to_cred=&sel_ptrm=%25&begin_hh=0&
    begin_mi=0&end_hh=0&end_mi=0&begin_ap=x&end_ap=y&path=1&SUB_BTN=Course+Search

    rsts=dummy&crn=dummy&term_in=202330&sel_subj=SPCH&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&
    sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=%25&sel_attr=dummy&
    sel_crse=&sel_title=&sel_from_cred=&sel_to_cred=&begin_hh=0&begin_mi=0&end_hh=0&end_mi=0&
    begin_ap=x&end_ap=y&path=1&SUB_BTN=Course+Search
    '''

    data = {'rsts':'dummy', 'crn':'dummy','term_in':self.auth.pterm, 'sel_subj':['dummy', code],
            'sel_day':'dummy', 'sel_schd':'dummy', 'sel_insm':'dummy', 'sel_camp':'dummy', 
            'sel_levl':'dummy', 'sel_sess':'dummy', 'sel_instr':'dummy', 'sel_ptrm':['dummy', '%'], 
            'sel_attr':'dummy', 'sel_crse':'', 'sel_title':'', 'sel_from_cred':'',
            'sel_to_cred':'', 'begin_hh':'0', 'begin_mi':'0', 'end_hh':'0',
            'end_mi':'0','begin_ap':'x', 'end_ap':'y', 'path':'1','SUB_BTN':'Course Search'
            }

    response = self.post_request(uri, data)
    print(response.request.body)
    self.auth.prev_site_ = uri
    content = response.text
    self.update_cookies(response)
    soup = bs(content, 'html.parser')
    select = soup.findAll('td', {'bypass_esc': 'Y'})
    print("Select: ", select, soup)
    crss = select[1::2]

    self.auth.crss_ = []
    for crs in crss: self.auth.crss_.append(crs.text)

    print(self.auth.crss_)
    print('>'*8+'get_course() DEBUG ENDS'+'<'*8+'\n')

    return self.auth.crss_
  
  def get_user_profile(self):
    profile = User_Profile()

    profile.set_name()

    return profile

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
  post = subparser.add_parser('post', help="post data to the given uri")

  group = authenticate.add_mutually_exclusive_group()
  group.add_argument('-d', '--destfile', type=str, help='file where login credentials are located')
  subgroup = group.add_argument_group()
  subgroup.add_argument('-u', '--username', type=str, help="Aggie Access SID (Student ID)")
  subgroup.add_argument('-p', '--pin', type=str, help='Aggie Access Pin')

  get.add_argument('resource', type=str, help='target resource type {term, subject,...}', choices=rsrc_choices)
  get.add_argument('session', type=str, help='session file address')
  
  post.add_argument('resource', type=str, help='target resource type {term, subject,...}', choices=rsrc_choices)
  post.add_argument('data', type=str, help="data file with data to be posted to target")
  post.add_argument('session', type=str, help='session file address')

  args = parser.parse_args()

  if not args.command:
    parser.print_help()
    print('Aggie Access Authenticator\n')
    sid = input('SID: ')
    pin = getpass('PIN: ')
    a = Authenticate(sid, pin)
    a.login(NCAT_URI)

    pickle_name = f'.{sid}-sess.pickle'
    a.save_data(pickle_name)

  if args.command == 'auth':
    if args.destfile:
      d = list(file_to_dict(args.destfile).items())[0]
      sid = d[0]
      pin = d[1]
      a = Authenticate(sid, pin)

      pickle_name = f'.{sid}-sess.pickle'
      a.save_data(pickle_name)
    elif args.username and args.pin:
      sid = args.username
      pin = args.pin
      a = Authenticate(sid, pin)

      pickle_name = f'.{sid}-sess.pickle'
      a.save_data(pickle_name)
    else:
      print('Hmm... something went wrong')
      print(args)

  if args.command == 'get':
    if args.resource and args.session:
      rsrc = args.resource
      sess = args.session
      file = open(sess, 'rb')
      auth = pickle.load(file)
      print(auth)
      scrape = ScrAApe(auth)
      file.close()                                      # close the file
      
      if args.resource == 'term':
        # profile = scrape.get_profile()
        terms = scrape.get_terms()
        

      if args.resource == 'subject':
        subjs = scrape.get_subject()

      if args.resource == 'course':
        crss = scrape.get_course()

      pickle_name = f'.{auth.usrnme}-sess.pickle'
      auth.save_data(pickle_name)
    else:
      print('Hmm... something went wrong')
      print(args)

  if args.command == 'post':
    if args.resource and args.session:
      rsrc = args.resource
      sess = args.session
      data = file_to_dict(args.data)

      file = open(sess, 'rb')
      auth = pickle.load(file)
      print(auth)
      scrape = ScrAApe(auth)
      print(scrape)

      if rsrc == 'term':
        uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.p_disp_dyn_ctlg'
      else:
        uri = ''

      
      response = scrape.post_request(uri, data)

      file.close()# close the file


    else:
      print('Hmm... something went wrong')
      print(args)

  # scrape = ScrAApe(a)
  # terms = scrape.get_terms()
  # scrape.get_subject('Summer I 2023')

