from re import I
from django.test import TestCase, Client
from .models import Song, Category
from http.cookies import SimpleCookie
import base64
import os
import json
import requests

client = Client()


# written by Matt
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
    jwt_access_payload = ""
    jwt_access_token = ""
    test_user_id = ""

    def setUp(self):
        Category.objects.create(id=1, name="Rock")
        Song.objects.create(id=1, title="test song", artist="Matt", category_id=1)

        cookie = get_auth_credentials()
        self.jwt_access_payload = cookie["jwt_access_payload"]
        self.jwt_access_token = cookie["jwt_access_token"]

        decoded_payload_bytes = base64.b64decode(cookie["jwt_access_payload"])
        decoded_payload_str = decoded_payload_bytes.decode("utf-8")
        json_data = json.loads(decoded_payload_str)
        self.test_user_id = json_data["user"]["id"]

    def tearDown(self):
        url = f"http://accounts:8000/api/accounts/{self.test_user_id}/"
        payload = {"will_hard_delete": "true"}
        cookies = {
            "jwt_access_payload": self.jwt_access_payload,
            "jwt_access_token": self.jwt_access_token,
        }

        response = requests.delete(url, data=json.dumps(payload), cookies=cookies)
        print("teardown 1, user delete", response.text)

    def test_api_songs_returns_200(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        response = client.get(f"{self.api_test_host}/api/songs/")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_returns_200(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        response = client.get(f"{self.api_test_host}/api/songs/1/")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_created(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        post_song = json.dumps(
            {
                "id": 2,
                "title": "Ur new song",
                "artist": "Billy joel",
                "category": 1,
            }
        )

        response = client.post(f"{self.api_test_host}/api/songs/", post_song, "json")

        print(response)

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")

    def test_api_song_updated(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        update_song = json.dumps({"artist": "Jim Smith"})

        response = client.put(f"{self.api_test_host}/api/songs/1/", update_song, "json")

        self.assertEqual(response.status_code, 200, "Not Getting a 200 Code")


# written by carter
class CategoryModelTests(TestCase):
    api_test_host = os.environ.get("LYRA_TEST_HOST")
    jwt_access_payload = ""
    jwt_access_token = ""
    test_user_id = ""

    def setUp(self):
        Category.objects.create(id=1, name="Rock")
        Song.objects.create(id=1, title="test song", artist="Matt", category_id=1)

        cookie = get_auth_credentials()
        self.jwt_access_payload = cookie["jwt_access_payload"]
        self.jwt_access_token = cookie["jwt_access_token"]

        decoded_payload_bytes = base64.b64decode(cookie["jwt_access_payload"])
        decoded_payload_str = decoded_payload_bytes.decode("utf-8")
        json_data = json.loads(decoded_payload_str)
        self.test_user_id = json_data["user"]["id"]

    def tearDown(self):
        url = f"http://accounts:8000/api/accounts/{self.test_user_id}/"
        payload = {"will_hard_delete": "true"}
        cookies = {
            "jwt_access_payload": self.jwt_access_payload,
            "jwt_access_token": self.jwt_access_token,
        }

        response = requests.delete(url, data=json.dumps(payload), cookies=cookies)
        print("teardown 2, user delete", response.text)

    def test_api_get_all_categories(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        response = client.get(f"{self.api_test_host}/api/categories/")

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_get_category(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        response = client.get(f"{self.api_test_host}/api/categories/1/")

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_post_category(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        post_cat = json.dumps({"id": 2, "name": "Jazz"})
        response = client.post(
            f"{self.api_test_host}/api/categories/", post_cat, "json"
        )

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")

    def test_api_category_update(self):
        client.cookies = SimpleCookie(
            {
                "jwt_access_payload": self.jwt_access_payload,
                "jwt_access_token": self.jwt_access_token,
            }
        )
        update_cat = json.dumps({"name": "Blues"})

        response = client.put(
            f"{self.api_test_host}/api/categories/1/", update_cat, "json"
        )

        self.assertEqual(response.status_code, 200, "Not getting a 200 code bud.")
