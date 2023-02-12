#!/usr/bin/env python3

import argparse
import os
import pickle

from getpass import getpass
from requests import Session
from bs4 import BeautifulSoup as bs

NCAT_URI = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_ValLogin'
rsrc_choices = ['term', 'subject', 'course', 'section', 'time', 'instructor', 'loc', 'crn']
def post_request(auth, uri, data, referer):
    """
    post_request: takes an authenticated session, and posts data to the given uri
    """
    print('>'*8+'post_request() DEBUG STARTS'+'<'*8)
    print('Cookies:', auth.cookies_)
    response = auth.session.post(uri, data=data, headers={'Host': 'ssbprod-ncat.uncecs.edu', 
                                                    'Cookies': auth.format_cookies(auth.cookies_),
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
    print('>'*8+'post_request() DEBUG ENDS'+'<'*8+'\n')
    return response

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

  def login(self, uri):
    site = self.session.get(uri)
    print('>'*8+'DEBUG SECTION STARTS'+'<'*8)
    print('DEBUG >>> Session Cookies: ', self.session.cookies.get_dict())
    print('>'*8+'DEBUG SECTION ENDS'+'<'*8+'\n')
    print()
    self.cookies_ = self.session.cookies.get_dict()
    login_data = {"sid":self.usrnme, 'PIN':self.psswd}
    response = ScrAApe().post_request(self, uri, data=login_data, referer='https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_WWWLogin')
    self.cookies_ = self.session.cookies.get_dict()
    (print(f'{header}: {val}') for header, val in response.request.headers.items())
    url, status = self.verify(response)


    # page = self.session.get('https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfshd.P_CrseSchd')
    # print(page.content); print('\n'*3)

  def format_cookies(self, dic):
    s = ''.join([f'{key}={val};' for key, val in dic.items()])
    return s 
  
  def verify(self, response):
    print('>'*8+'verify() DEBUG SECTION STARTS'+'<'*8)
    (print(f'{header}: {val}') for header, val in response.request.headers.items())
    print()
    print(response.request.body)
    print(response.status_code)
    print(response.text)
    # FIXME: add logic here for successful and unsuccessful logins
    soup = bs(response.content, 'html.parser')
    url = soup.meta.attrs['content'][6:]          # url for second page after authentication FIXME: make this a regex
    print(url)
    print('>'*8+'verify() DEBUG SECTION ENDS'+'<'*8+'\n')
    return url, response.status_code
  
  def __str__(self):
    return f"""Authenticate Object:
  self.usrnme = {self.usrnme}
  self.psswd = {self.psswd}
  self.session = {self.session}
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
  global prev_site
  prev_site = 'no sites yet'

  def __init__(self, auth):
    self.auth = auth

  def get_terms(self, uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.p_disp_dyn_ctlg'):
    global prev_site 
    print('>'*8+'get_terms() DEBUG STARTS'+'<'*8)
    if 'terms_w_codes_' in self.__dict__:
      print('get_terms(): found it!')
      print('>'*8+'get_term() DEBUG ENDS'+'<'*8+'\n')
      return self.terms_w_codes_
    prev_site = uri
    response = self.auth.session.get(uri)
    content = response.text
    print(response.status_code)
    soup = bs(content, 'html.parser')
    select = soup.find('select', {'name': 'cat_term_in'})
    terms = select.findChildren()[1:6]
    terms_w_codes = {}
    for term in terms: terms_w_codes[term.text] = term.get('value') 
    print('terms_w_codes', terms_w_codes)
    print('>'*8+'get_term() DEBUG ENDS'+'<'*8+'\n')

    self.terms_w_codes_ = terms_w_codes
    return terms_w_codes
  
  # data should be selected term from get_terms()
  def get_subject(self, data):
    """
    get_subject: 

    Parameters
    __________
    data: dict - data to be posted
    """
    print('>'*8+'get_subject() DEBUG STARTS'+'<'*8)
    if self.terms_w_codes_:
      code = self.terms_w_codes_[data]
    else:
      print('Needs a valid term')
      return
    uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwckctlg.p_disp_cat_term_date'
    print('>'*8+'get_subject() DEBUG ENDS'+'<'*8+'\n')

  def post_request(self, uri, data, referer=prev_site):
    """
    post_request: takes an authenticated session, and posts data to the given uri
    """
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
    print('>'*8+'post_request() DEBUG ENDS'+'<'*8+'\n')
    return self.response_
  
  def __str__(self):
    return f"""ScrAApe Object:
  prev_site = {prev_site}
  self.auth = {self.auth.cookies_}
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
      with open('.shadow', 'r') as file:
        text = file.readlines()
        for t in text: print(t)
    elif args.username and args.pin:
      print(args.username, args.pin)
    else:
      print('Hmm... something went wrong')
      print(args)

  if args.command == 'get':
    if args.resource and args.session:
      rsrc = args.resource
      sess = args.session
      file = open(sess, 'rb')
      auth = pickle.load(file)
      scrape = ScrAApe(auth)
      
      file.close()                                      # close the file
      
      if args.resource == 'term':
        scrape.get_terms()

      if args.resource == 'subject':
        scrape.get_subject()

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

