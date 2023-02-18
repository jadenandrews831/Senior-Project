from django.db import models

class StudentData(models.Model):
    banner_id = models.CharField(max_length=9, primary_key=True)
    pin = models.CharField(max_length=6)
    
    ordering = ['banner_id']
    
    def __str__(self):
        return self.banner_id
    
    def __str__(self):
        return self.pin

class StudentInfo(models.Model):
    banner_id = models.CharField(max_length=9, primary_key=True)
    pin = models.CharField(max_length=6)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    major = models.CharField(max_length=50)
    level = models.CharField(max_length=15)
    classification = models.CharField(max_length=15)
    
    ordering = [last_name]
