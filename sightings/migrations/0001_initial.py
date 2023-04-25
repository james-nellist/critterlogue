# Generated by Django 4.2 on 2023-04-19 10:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('animals', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sighting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_sighted', models.DateTimeField(auto_now_add=True)),
                ('notes', models.TextField(max_length=750)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sightings', to='animals.animal')),
            ],
        ),
    ]
