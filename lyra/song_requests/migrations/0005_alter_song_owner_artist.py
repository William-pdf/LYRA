# Generated by Django 4.0.3 on 2022-09-08 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song_requests', '0004_alter_category_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='owner_artist',
            field=models.CharField(max_length=100),
        ),
    ]
