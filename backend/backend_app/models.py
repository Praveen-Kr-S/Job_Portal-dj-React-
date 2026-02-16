from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    salary_range = models.CharField(max_length=50, blank=True)
    posted_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('applied', 'Applied'), ('reviewed', 'Reviewed'), ('interviewed', 'Interviewed'), ('hired', 'Hired'), ('rejected', 'Rejected')], default='applied')
    applied_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant.username} - {self.job.title}"
        