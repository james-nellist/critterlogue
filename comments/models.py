from django.db import models

# Create your models here.
class Comment(models.Model):
    sighting = models.ForeignKey(
        'sightings.Sighting',
        on_delete=models.CASCADE,
        related_name="comments"
    )
    date_commented = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(max_length=750)