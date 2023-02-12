# Aggie Hub (SENIOR PROJECT) -- TITLE IN THE WORKS --

This is a web utility which aims to make the daily lives of students easier.

## Execute Code

Open your terminal and type the following:

```
cd .../Senior Project/src
python3 -m pip install -r requirements.txt
python3 scrAApe.py
```

## Usage

```
scrAApe.py                                                                                          # authenticate a session manually, then serialize it for future use
scrAApe.py auth -d .shadow                                                                          # authenticate to Aggie Access with credentials from a protected file
scrAApe.py auth -u <username> -p <pin>                                                              # authenticate to Aggie Access with a given username and password
scrAApe.py get {term, subject} .<username>-sess.pickle                                              # get data from a given uri in a pickled session
scrAApe.py post {term, subject} <data> .<username>-sess.pickle                                      # post data to the given uri from a pickled session
```
