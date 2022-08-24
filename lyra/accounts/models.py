from django.db import models
from django.conf import settings

USER_MODEL = settings.AUTH_USER_MODEL


class Artist(models.Model):
    member = models.OneToOneField(USER_MODEL, on_delete=models.CASCADE)
