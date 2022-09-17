from django.test import TestCase, Client
from .models import Song, Category
import os
import json
import requests

client = Client()


# written by Matt
# Credential tests work in dev env, but not prod. Removed for now
def get_auth_credentials():
    url = "http://accounts:8000/api/accounts/"
    payload = {
        "username": "Towlie",
        "password": "towlie",
        "email": "uratowel@towel.biz",
    }
    headers = {"Content-Type": "application/json"}
    user_create_response = requests.post(url, json=payload, headers=headers)

    if user_create_response.ok:
        session = requests.Session()
        session.verify = False

        sign_in_response = session.post(
            "http://accounts:8000/login/",
            {"username": "Towlie", "password": "towlie"},
        )

        if sign_in_response.ok:
            return session.cookies.get_dict()


# written by carter
class SongModelTests(TestCase):
    api_test_host = os.environ.get("LYRA_TEST_HOST")

    def setUp(self):
        Category.objects.create(id=1, name="Rock")
        Song.objects.create(id=1, title="test song", artist="Matt", category_id=1)

    def test_api_songs_returns_200(self):
        response = client.get(f"{self.api_test_host}/api/songs/")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_returns_200(self):
        response = client.get(f"{self.api_test_host}/api/songs/1/")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_created(self):
        post_song = json.dumps(
            {
                "id": 2,
                "title": "Ur new song",
                "artist": "Billy joel",
                "category": 1,
            }
        )

        response = client.post(f"{self.api_test_host}/api/songs/", post_song, "json")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_updated(self):
        update_song = json.dumps({"artist": "Jim Smith"})

        response = client.put(f"{self.api_test_host}/api/songs/1/", update_song, "json")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")


# written by carter
class CategoryModelTests(TestCase):
    api_test_host = os.environ.get("LYRA_TEST_HOST")

    def setUp(self):
        Category.objects.create(id=1, name="Rock")
        Song.objects.create(id=1, title="test song", artist="Matt", category_id=1)

    def test_api_get_all_categories(self):
        response = client.get(f"{self.api_test_host}/api/categories/")

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_get_category(self):
        response = client.get(f"{self.api_test_host}/api/categories/1/")

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_post_category(self):
        post_cat = json.dumps({"id": 2, "name": "Jazz"})
        response = client.post(
            f"{self.api_test_host}/api/categories/", post_cat, "json"
        )

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_category_update(self):
        update_cat = json.dumps({"name": "Blues"})

        response = client.put(
            f"{self.api_test_host}/api/categories/1/", update_cat, "json"
        )

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")
