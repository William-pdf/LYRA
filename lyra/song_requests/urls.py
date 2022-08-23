from django.urls import path

from .views import (
    api_songs,
    api_song,
    api_categories,
    api_category
)

urlpatterns = [
    path(
        'api/songs/', 
        api_songs, 
        name='api_songs'
    ),
    path(
        'api/songs/<int:pk>/',
        api_song,
        name="api_song"
        ),
    path(
        'api/categories/', 
        api_categories,
        name="api_categories"
    ),
    path(
        'api/categories/<int:pk>/',
        api_category,
        name="api_category"
    ),
]