# Generated by Django 5.0.4 on 2024-04-23 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_resume'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='resume_file',
            field=models.FileField(blank=True, null=True, upload_to='resumes/'),
        ),
    ]
