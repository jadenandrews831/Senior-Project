# Aggie Bridge (SENIOR PROJECT)

This is a web utility which aims to make the daily lives of students easier.

## Execute Code

Open your terminal and type the following:

```
cd .../Senior Project        # First, locate the Senior Project Directory
source ./snr_env/bin/activate
python3 scrAApe.py
```

## scrAApe: The Aggie Access Authenticator and Web Scraper

### Usage

```
scrAApe.py                                                                                          # authenticate a session manually, then serialize it for future use
scrAApe.py auth -d .shadow                                                                          # authenticate to Aggie Access with credentials from a protected file
scrAApe.py auth -u <username> -p <pin>                                                              # authenticate to Aggie Access with a given username and password
scrAApe.py get {term, subject} .<username>-sess.pickle                                              # get data from a given uri in a pickled session
scrAApe.py post {term, subject} <datafile> .<username>-sess.pickle                                   # post data to the given uri from a pickled session
```
