from django.db import models
import uuid
from django.utils import timezone

class userData(models.Model):
    userId=models.UUIDField(primary_key=True,  default=uuid.uuid4, editable=False)
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=60)
    password=models.CharField(max_length=500)
    createOn=models.DateTimeField(default=timezone.now)
    updateOn=models.DateTimeField()

    def __str__(self):
        return self.userId

class Notes(models.Model):
    noteId=models.UUIDField(primary_key=True,  default=uuid.uuid4, editable=False)
    userId=models.ForeignKey(userData, on_delete=models.CASCADE)
    noteTitle=models.CharField(max_length=200)
    noteContent=models.CharField(max_length=1000)
    createOn=models.DateTimeField(default=timezone.now)
    updateOn=models.DateTimeField()

    def __str__(self):
        return self.noteId
