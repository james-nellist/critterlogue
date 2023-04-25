from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Sighting(models.Model):
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='sightings'
    )
    animal = models.ForeignKey(
        'animals.Animal',
        on_delete=models.CASCADE,
        related_name='sightings'
    )
    date_sighted = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(max_length=750)
    image = models.URLField(max_length=1000, validators=[URLValidator()])