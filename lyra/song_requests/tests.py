from django.test import TestCase, Client
from .models import Song, Category
import json

client = Client()


# written by carter
class SongModelTests(TestCase):
    def setUp(self):
        Category.objects.create(id=1, name="Rock")
        Song.objects.create(id=1, title="test song", artist="Matt", category_id=1)

    def test_api_songs_returns_200(self):
        response = client.get("http://localhost:8000/trl/api/songs/")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_returns_200(self):
        response = client.get("http://localhost:8000/trl/api/songs/1/")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_created(self):
        post_song = json.dumps(
            {
                "title": "Ur new song",
                "artist": "Billy joel",
                "owner_artist": 0,
                "category": "rock",
            }
        )

        response = client.post(
            "http://localhost:8000/trl/api/songs/", post_song, "json"
        )

        print(response)

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_updated(self):
        update_song = json.dumps({"artist": "Jim Smith"})

        response = client.put(
            "http://localhost:8000/trl/api/songs/1/", update_song, "json"
        )

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")


# written by carter
class CategoryModelTests(TestCase):
    def setUp(self):
        Category.objects.create(id=1, name="Rock")
        Song.objects.create(id=1, title="test song", artist="Matt", category_id=1)

    def test_api_get_all_categories(self):
        response = client.get("http://localhost:8000/trl/api/categories/")

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_get_category(self):
        response = client.get("http://localhost:8000/trl/api/categories/1/")

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_post_category(self):
        post_cat = json.dumps({"id": 2, "name": "Jazz"})
        response = client.post(
            "http://localhost:8000/trl/api/categories/", post_cat, "json"
        )

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_category_update(self):
        update_cat = json.dumps({"name": "Blues"})

        response = client.put(
            "http://localhost:8000/trl/api/categories/1/", update_cat, "json"
        )

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")
