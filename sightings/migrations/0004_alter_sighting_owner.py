# Generated by Django 4.2 on 2023-04-22 19:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sightings', '0003_sighting_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sighting',
            name='owner',
            field=models.ForeignKey(db_column='email', on_delete=django.db.models.deletion.CASCADE, related_name='sightings', to=settings.AUTH_USER_MODEL),
        ),
    ]