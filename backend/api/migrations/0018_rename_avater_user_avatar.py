# Generated by Django 5.0.4 on 2024-04-30 06:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_user_user_role'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='avater',
            new_name='avatar',
        ),
    ]
