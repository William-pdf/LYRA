from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50, null=True, blank=True)
    is_requested = models.BooleanField(default=False)
    is_requestable = models.BooleanField(default=True)
    owner_artist = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category, related_name="songs", on_delete=models.PROTECT
    )

    def __str__(self):
        return self.title
