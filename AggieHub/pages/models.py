from django.db import models

class StudentData(models.Model):
    banner_id = models.CharField(max_length=9, primary_key=True)
    pin = models.CharField(max_length=6)
    
    ordering = ['banner_id']
    
    def __str__(self):
        return self.banner_id
    
    def __str__(self):
        return self.pin
    
    '''
class StudentInfo(models.Model):
    banner_id = models.CharField(max_length=9)
    pin = models.CharField(max_length=6)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    major = models.CharField(max_length=50)
    level = models.CharField(max_length=15)
    classification = models.CharField(max_length=15)
    
    ordering = [last_name]
    '''
    
class Term (models.Model):
    term = models.CharField(max_length=6)

    def __str__(self):
        if self.term.endswith('10'):
            return 'Fall ' + self.term[:-2]
        elif self.term.endswith('20'):
            return 'Spring ' + self.term[:-2]
        elif self.term.endswith('30'):
            return 'Summer I ' + self.term[:-2]
        elif self.term.endswith('40'):
            return 'Summer II ' + self.term[:-2]
        
class Subject (models.Model):
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    
    ordering = [subject]
    
    def __str__(self):
        return self.subject
    
class Course (models.Model):
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    course_id = models.CharField(max_length=3)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
        
    ordering = [course_id]
    
    def __str__(self):
        return f'[{self.course_id}] - {self.title}'
    
class Section (models.Model):
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.CharField(max_length=3)
    abbr = models.CharField(max_length=4)
    crn = models.CharField(max_length=5)
    campus = models.CharField(max_length=2)
    credits = models.CharField(max_length=1)
    days = models.CharField(max_length=5)
    time = models.CharField(max_length=20)
    instructor = models.CharField(max_length=70)
    location = models.CharField(max_length=10)
    
    ordering = [section]
