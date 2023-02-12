from django.db import models

class StudentData(models.Model):
    banner_id = models.CharField(max_length=9)
    pin = models.CharField(max_length=6)
    
    ordering = ['banner_id']
    
    def __str__(self):
        return self.banner_id
    
    def __str__(self):
        return self.pin
    
class StudentInfo(models.Model):
    banner_id = models.CharField(max_length=9)
    pin = models.CharField(max_length=6)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    major = models.CharField(max_length=50)
    level = models.CharField(max_length=15)
    classification = models.CharField(max_length=15)
    
    ordering = [last_name]
    
class SummerI(models.Model):
    subjects = models.CharField(max_length=100)
    titles = models.CharField(max_length=50)
    course = models.CharField(max_length=3)
    sections = models.CharField(max_length=3)
    CRN = models.CharField(max_length=5)
    campus = models.CharField(max_length=2)
    credits = models.CharField(max_length=1)
    days = models.CharField(max_length=5)
    time = models.CharField(max_length=20)
    instructor = models.CharField(max_length=70)
    location = models.CharField(max_length=10)
    
    ordering = [subjects]
    
    
class SummerII(models.Model):
    subjects = models.CharField(max_length=100)
    titles = models.CharField(max_length=50)
    course = models.CharField(max_length=3)
    sections = models.CharField(max_length=3)
    CRN = models.CharField(max_length=5)
    campus = models.CharField(max_length=2)
    credits = models.CharField(max_length=1)
    days = models.CharField(max_length=5)
    time = models.CharField(max_length=20)
    instructor = models.CharField(max_length=70)
    location = models.CharField(max_length=10)
    
    ordering = [subjects]
    
class SpringFall(models.Model):
    subjects = models.CharField(max_length=100)
    titles = models.CharField(max_length=50)
    course = models.CharField(max_length=3)
    sections = models.CharField(max_length=3)
    CRN = models.CharField(max_length=5)
    campus = models.CharField(max_length=2)
    credits = models.CharField(max_length=1)
    days = models.CharField(max_length=5)
    time = models.CharField(max_length=20)
    instructor = models.CharField(max_length=70)
    location = models.CharField(max_length=10)
    
    ordering = [subjects]