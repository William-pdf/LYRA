from django.test import TestCase, Client
from .models import Song, Category
import json

client = Client()
# Create your tests here.

# written by carter
class SongModelTests(TestCase):
    def setUp(self):
        Category.objects.create(
            id=1,
            name="Rock"
        )
        Song.objects.create(
            id=1,
            title="test song",
            artist="Matt",
            category_id=1
        )
        
    def test_api_songs_returns_200(self):
        response = client.get("http://localhost:8000/trl/songs/")
        
        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")
        
        
    def test_api_song_returns_200(self):
        response = client.get("http://localhost:8000/trl/songs/1/")
        
        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")
    # d=response.json()
    # assert d["id"] == 1
    # assert d["title"] == "our test song"
    # assert d["artist"]== "me"

        