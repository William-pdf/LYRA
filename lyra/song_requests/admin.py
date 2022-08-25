from django.contrib import admin
from .models import Song, Category
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    pass
