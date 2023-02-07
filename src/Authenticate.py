import argparse

from getpass import getpass
from requests import Session
from bs4 import BeautifulSoup

NCAT_URI = 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_ValLogin'

bs = BeautifulSoup

class Authenticate():
  def __init__(self, usrnme, psswd):
    self.usrnme = usrnme
    self.psswd = psswd
    self.session = Session()

  def login(self, uri):
    site = self.session.get(uri)
    print('DEBUG >>> Session Cookies: ', self.session.cookies.get_dict())
    print()
    cookies = self.session.cookies.get_dict()
    login_data = {"sid":self.usrnme, 'PIN':self.psswd}
    response = self.session.post(uri, data=login_data, headers={'Host': 'ssbprod-ncat.uncecs.edu',
                                                                'Cookie': self.format_cookies(cookies),
                                                                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
                                                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                                                'Accept-Language': 'en-US,en;q=0.5',
                                                                'Accept-Encoding': 'gzip, deflate',
                                                                'Content-Type': 'application/x-www-form-urlencoded',
                                                                'Orgin': 'https://ssbprod-ncat.uncecs.edu',
                                                                'Referer': 'https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/twbkwbis.P_WWWLogin',
                                                                'Upgrade-Insecure-Requests': '1',
                                                                'Sec-Fetch-Dest': 'document',
                                                                'Sec-Fetch-Mode': 'navigate', 
                                                                'Sec-Fetch-Site': 'same-origin',
                                                                'Sec-Fetch-User': '?1',
                                                                'Te': 'trailers',
                                                                'Connection': 'close'})

    (print(f'{header}: {val}') for header, val in response.request.headers.items())
    print()
    print(response.request.body)
    print(response.status_code)
    print(response.text)
    # page = self.session.get('https://ssbprod-ncat.uncecs.edu/pls/NCATPROD/bwskfshd.P_CrseSchd')
    # print(page.content); print('\n'*3)

  def format_cookies(self, dic):
    s = ''.join([f'{key}={val};' for key, val in dic.items()])
    return s


if __name__ == "__main__"():
  parser = argparse.ArgumentParser(description='Aggie Access Authenticator')

  print('Aggie Access Authenticator\n\n')
  sid = input('SID: ')
  pin = getpass('PIN: ')
  a = Authenticate(sid, pin)
  a.login(NCAT_URI)

