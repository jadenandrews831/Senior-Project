import argparse
import os

from getpass import getpass
from requests import Session
from bs4 import BeautifulSoup as bs

NCAT_URI = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_ValLogin'

def post_request(auth, uri, data, referer):
    print('>'*8+'post_request() DEBUG STARTS'+'<'*8)
    print('Cookies:',auth.cookies_)
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
    # response = self.session.post(uri, data=login_data, headers={'Host': 'ssbprod-ncat.uncecs.edu',
    #                                                             'Cookie': self.format_cookies(self.cookies_),
    #                                                             'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
    #                                                             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    #                                                             'Accept-Language': 'en-US,en;q=0.5',
    #                                                             'Accept-Encoding': 'gzip, deflate',
    #                                                             'Content-Type': 'application/x-www-form-urlencoded',
    #                                                             'Orgin': 'https://ssbprod-ncat.uncecs.edu',
    #                                                             'Referer': 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_WWWLogin',
    #                                                             'Upgrade-Insecure-Requests': '1',
    #                                                             'Sec-Fetch-Dest': 'document',
    #                                                             'Sec-Fetch-Mode': 'navigate', 
    #                                                             'Sec-Fetch-Site': 'same-origin',
    #                                                             'Sec-Fetch-User': '?1',
    #                                                             'Te': 'trailers',
    #                                                             'Connection': 'close'})
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
  set_terms:  
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
    terms_w_codes = {};
    for term in terms: terms_w_codes[term.text] = term.get('value') 
    print(terms_w_codes)
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
  parser = argparse.ArgumentParser(prog="scrAApe", description='The Aggie Access Authenticator and Web Scraper')

  print('Aggie Access Authenticator\n')
  sid = input('SID: ')
  pin = getpass('PIN: ')
  a = Authenticate(sid, pin)
  a.login(NCAT_URI)
  scrape = ScrAApe(a)
  terms = scrape.get_terms()
  scrape.get_subject('Summer I 2023')

