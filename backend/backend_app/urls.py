from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello_api, name='hello_api'),
    path('register/', RegisterUser, name='register_user'),
    path('login/', LoginUser, name='login_user'),
    path('jobs/', JobList, name='job_list'),
    path('apply/', ApplyJob, name='apply_job'),
]
