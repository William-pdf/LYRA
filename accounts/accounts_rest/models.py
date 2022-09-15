from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    artist_name = models.CharField(max_length=100, null=True, blank=True, unique=True)

    