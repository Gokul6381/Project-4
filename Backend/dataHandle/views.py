from django.shortcuts import get_object_or_404
from django.http import HttpResponse,JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password
from django.utils import timezone
from datetime import datetime

from .models import userData,Notes

@csrf_exempt
def registerData(request):
   if request.method == "POST":
      try:
         data=json.load(request)
         useData=data.get('data',{})

         name=useData['name']
         email=useData['email']
         password=useData['password']
         update=timezone.now()
         passKey=make_password(password=password)

         data=userData.objects.create(name=name,email=email,password=passKey,updateOn=update)
         data.save()
         print('success')
         return HttpResponse(useData)


      except Exception as err:
         print(str(err))
         return HttpResponse('Error',err)
 

@csrf_exempt
def loginData(request):
   try:
      if request.method == "POST":
         data=json.load(request)
         useData=data.get('data',{})

         user=useData['userName']
         password=useData['password']

   
         data=userData.objects.get(name=user)
         passKey=data.password
         is_valid=check_password(password,passKey)

         if(is_valid):             
             user_data = {
            "name": data.name,
            "email": data.email,
            "status":'Login Successfully...'
        }
             print(data.userId)
             return JsonResponse(user_data)

         else:
            print('login fail')
            return HttpResponse('Login Failed...')

   except Exception as err:
      print(str(err))
      return HttpResponse('Unknown User...')
    

@csrf_exempt
def update(request):
   if request.method=="POST":
      data=json.load(request)
      updateData=data.get('data',{})

      passKey=make_password(password=updateData['password'])

      data=userData.objects.get(name=updateData['userName'])
      data.name=updateData['name']
      data.email=updateData['email']
      data.password=passKey
      data.updateOn=timezone.now()

      data.save()      
      return HttpResponse("Your Data Updated Successfully...")
   return HttpResponse('Your Data Update Failed...')


@csrf_exempt
def notes(request):
    if request.method=="POST":
      data=json.load(request)
      data=data.get('data',{})

      print(data['userName'])
      title=data['title']
      content=data['content']
      data=userData.objects.get(name=data['userName'])    
      update=timezone.now()
      note=Notes.objects.create(userId=data,noteTitle=title,noteContent=content,updateOn=update)

      return HttpResponse("Your Notes Saved Successfully...")
    return HttpResponse('Your Notes Not Saved...')

@csrf_exempt    
def home(request):
   try:
      if request.method=="POST":
         data=json.load(request)
         user=data.get('data',{})

         print(user)
         userid= userData.objects.get(name=user) 
         user=userid.userId
         datas= Notes.objects.filter(userId=user)
         
         
         notes=[]
         for data in datas:
            notes.append({
                     "id": data.noteId,
                    "noteTitle": data.noteTitle,
                    "noteContent": data.noteContent,
                    "lastUpdate":data.updateOn.date(),
                })
               
         print("Serialized notes:", notes)
       
         return JsonResponse({"notes": notes}, safe=False)
   except Exception as err:    
      return HttpResponse(f'Failed: {err}')
      
      
@csrf_exempt
def delete(request):
   try:
      if request.method=='POST':
         data=json.load(request)
         note=data.get('data',{})
         print(note)
         
         data=Notes.objects.get(noteId=note).delete()
         
         return HttpResponse('ok')
   except Exception as err:
      return HttpResponse(f"Error : {str(err)}")
   
   
@csrf_exempt
def seeNote(request):
   try:
      if request.method=='POST':
         data=json.load(request)
         note=data.get('data',{})
         print(note)
         
         data=Notes.objects.get(noteId=note)
         notes={
                     "id": data.noteId,
                    "noteTitle": data.noteTitle,
                    "noteContent": data.noteContent,
                    "lastUpdate":data.updateOn.date(),
                }
               
         
         return JsonResponse(notes)
   except Exception as err:
      return HttpResponse(f"Error : {str(err)}")
   
   
@csrf_exempt
def updateNote(request):
   if request.method=="POST":
      data=json.load(request)
      updateNote=data.get('data',{})
      print(updateNote['noteId'])

      data=Notes.objects.get(noteId=updateNote['noteId'])
      
      if (updateNote['title']):
         data.noteTitle=updateNote['title']
      if (updateNote['content']):
         data.noteContent=updateNote['content']
         
      data.updateOn=timezone.now()
      data.save()      
      return HttpResponse("Your Data Updated Successfully...")
   return HttpResponse('Your Data Update Failed...')