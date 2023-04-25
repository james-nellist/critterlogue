from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Animal(models.Model):
    name = models.CharField(max_length=500)
    type = models.CharField(max_length=100)
    description = models.TextField(max_length=750)
    image = models.URLField(max_length=1000, validators=[URLValidator()])

    def __str__(self):
        return self.name
