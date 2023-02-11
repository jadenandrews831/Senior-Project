#!/usr/bin/env python3

import argparse
import os
import pickle

from getpass import getpass
from requests import Session
from bs4 import BeautifulSoup as bs

NCAT_URI = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_ValLogin'

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
    print('>'*8+'post_request() DEBUG STARTS'+'<'*8+'\n')
    return response
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
    print('>'*8+'DEBUG SECTION ENDS'+'<'*8)
    print()
    self.cookies_ = self.session.cookies.get_dict()
    login_data = {"sid":self.usrnme, 'PIN':self.psswd}
    response = post_request(self, uri, data=login_data, referer='https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_WWWLogin')
    self.cookies_ = self.session.cookies.get_dict()
    (print(f'{header}: {val}') for header, val in response.request.headers.items())
    url, status = self.verify(response)


    # page = self.session.get('https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfshd.P_CrseSchd')
    # print(page.content); print('\n'*3)

  def format_cookies(self, dic):
    s = ''.join([f'{key}={val};' for key, val in dic.items()])
    return s 
  
  def verify(self, response):
    print('>'*8+'DEBUG SECTION STARTS'+'<'*8)
    (print(f'{header}: {val}') for header, val in response.request.headers.items())
    print()
    print(response.request.body)
    print(response.status_code)
    print(response.text)
    # FIXME: add logic here for successful and unsuccessful logins
    soup = bs(response.content, 'html.parser')
    url = soup.meta.attrs['content'][6:]          # url for second page after authentication FIXME: make this a regex
    print(url)
    print('>'*8+'DEBUG SECTION ENDS'+'<'*8)
    return url, response.status_code
  
  # pickle data for ScrAApe and database use
  def save_data(self):
    pass

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

  def get_terms(self):
    print('>'*8+'get_terms() DEBUG STARTS'+'<'*8)
    if 'terms_w_codes_' in self.__dict__:
      print('get_terms(): found it!')
      print('>'*8+'get_term() DEBUG ENDS'+'<'*8)
      return self.terms_w_codes_
    uri = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfcls.p_disp_dyn_ctlg'
    self.prev_rsrc_ = os.path.basename(uri)
    response = self.auth.session.get(uri)
    content = response.text
    print(response.status_code)
    soup = bs(content, 'html.parser')
    select = soup.find('select', {'name': 'cat_term_in'})
    terms = select.findChildren()[1:6]
    terms_w_codes = {}
    for term in terms: terms_w_codes[term.text] = term.get('value') 
    print('terms_w_codes', terms_w_codes)
    print('>'*8+'get_term() DEBUG ENDS'+'<'*8)

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
    print('>'*8+'get_subject() DEBUG ENDS'+'<'*8)
  

if __name__ == "__main__":
  """
  Usage
  ______
    scrAApe.py                                                                      # authenticate a session manually, then serialize it for future use
    scrAApe.py auth -d .shadow                                                      # authenticate to Aggie Access with credentials from a protected file
    scrAApe.py auth -u <username> -p <pin>                                          # authenticate to Aggie Access with a given username and password
    scrAApe.py get <uri> --session-file .<username>-sess.pickle                      # get data from a given uri in a pickled session
    scrAApe.py post <uri> -d <data> --session-file .<username>-sess.pickle           # post data to the given uri from a pickled session
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

  get.add_argument('uri', type=str, help='target uri')
  get.add_argument('--session-file', type=str, help='session file address', required=True)
  
  post.add_argument('uri', type=str, help='target uri')
  post.add_argument('--session-file', type=str, help='session file address', required=True)

  args = parser.parse_args()

  if not args.command:
    parser.print_help()
    print('Aggie Access Authenticator\n')
    sid = input('SID: ')
    pin = getpass('PIN: ')
    a = Authenticate(sid, pin)
    a.login(NCAT_URI)

    pickle_name = f'.{sid}-sess.pickle'
    with open(pickle_name, 'wb') as file:
      pickle.dump(a, file)
      print(f"Session Created! Saved to >>> {pickle_name}")
      exit()

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
    if args.uri and args.session_file:
      print(args.uri, args.session_file)
    else:
      print(args)

  if args.command == 'post':
    if args.uri and args.session_file:
      print(args.uri, args.session_file)
    else:
      print('Hmm... something went wrong')
      print(args)

  # scrape = ScrAApe(a)
  # terms = scrape.get_terms()
  # scrape.get_subject('Summer I 2023')

