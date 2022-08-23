from django.urls import path

from .views import (
    api_songs,
    api_song,
    api_categories,
    api_category
)

urlpatterns = [
    path(
        'songs/', 
        api_songs, 
        name='api_songs'
    ),
    path(
        'songs/<int:pk>/',
        api_song,
        name="api_song"
        ),
    path(
        'categories/', 
        api_categories,
        name="api_categories"
    ),
    path(
        'categories/<int:pk>/',
        api_category,
        name="api_category"
    ),
]