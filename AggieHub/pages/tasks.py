import scrAApe

def authenticate(banner, pin):
    success = scrAApe.authenticate(banner, pin)
    return success