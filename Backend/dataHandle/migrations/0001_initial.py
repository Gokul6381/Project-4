# Generated by Django 5.1.4 on 2024-12-31 07:08

import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notes',
            fields=[
                ('noteId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('noteTitle', models.CharField(max_length=200)),
                ('noteContent', models.CharField(max_length=1000)),
                ('createOn', models.DateTimeField(default=django.utils.timezone.now)),
                ('updateOn', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='userData',
            fields=[
                ('userId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=60)),
                ('password', models.CharField(max_length=500)),
                ('createOn', models.DateTimeField(default=django.utils.timezone.now)),
                ('updateOn', models.DateTimeField()),
            ],
        ),
    ]