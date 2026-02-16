from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, JobSerializer, ApplicationSerializer
from rest_framework import status
from .models import Job,Application
from django.contrib.auth import authenticate

@api_view(['GET'])
def hello_api(request):
    return Response({'message': 'Welcome to the Job Portal API'})

@api_view(['POST'])
def RegisterUser(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



@api_view(['POST'])
def LoginUser(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        return Response({
            'user_id': user.id,
            'username': user.username,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def JobList(request):
    if request.method == 'GET':
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def ApplyJob(request):
    if request.method == 'POST':
        serializer = ApplicationSerializer(data=request.data)
        #check if the user has already applied for the job
        job_id = request.data.get('job')
        applicant_id = request.data.get('applicant')
        existing_application = Application.objects.filter(job_id=job_id, applicant_id=applicant_id).exists()
        if existing_application:
            return Response({'message': 'You have already applied for this job'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Application submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




