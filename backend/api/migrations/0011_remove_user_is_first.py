# Generated by Django 5.0.4 on 2024-04-24 15:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_user_is_first'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_first',
        ),
    ]
