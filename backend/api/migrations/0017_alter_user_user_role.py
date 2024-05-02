# Generated by Django 5.0.4 on 2024-04-30 02:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_user_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_role',
            field=models.CharField(choices=[('seeker', 'Seeker'), ('recruiter', 'Recruiter')], max_length=20),
        ),
    ]
