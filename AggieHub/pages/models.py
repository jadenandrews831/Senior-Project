from django.db import models

## A model for the student data
#
#  This model is used to store the student data in the database.
class StudentData(models.Model):
    banner_id = models.CharField(max_length=9, primary_key=True)
    pin = models.CharField(max_length=15)
    
    ordering = ['banner_id']
    
    def __str__(self):
        return self.banner_id
    
    def __str__(self):
        return self.pin
