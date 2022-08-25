from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50, null=True, blank=True)
    is_requested = models.BooleanField(default=False)
    is_requestable = models.BooleanField(default=True)
    owner_band = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(
        Category, related_name="songs", on_delete=models.PROTECT
    )

    def __str__(self):
        return self.title

    # band = models.ManyToManyField(
    #     Band,
    #     related_name='songs'
    #     on_delete=models.PROTECT
    # )
