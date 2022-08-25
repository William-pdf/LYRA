from django.test import TestCase, Client

client = Client()


# Written by Matt Roth
class UserTests(TestCase):
    def test_user_signup(self):
        response = client.post(
            "http://localhost:8001/api/accounts/",
            {
                "username": "Cthulhu",
                "password": "old+ones4eva",
                "artist_name": "R'lyeh Rockers",
                "email": "cartmanrulez@hotmail.biz",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

    def test_user_signup_and_login(self):
        client.post(
            "http://localhost:8001/api/accounts/",
            {
                "username": "Cthulhu",
                "password": "old+ones4eva",
                "artist_name": "R'lyeh Rockers",
                "email": "cartmanrulez@hotmail.biz",
            },
            content_type="application/json",
        )

        # Login info has to be form data. Djwto has "silly reasons" for this.
        # Client() defaults POST data to multipart form data if content_type is not specified
        response = client.post(
            "http://localhost:8001/login/",
            {"username": "Cthulhu", "password": "old+ones4eva"},
        )
        self.assertEqual(response.status_code, 200)

    def test_user_logout(self):
        # signup
        client.post(
            "http://localhost:8001/api/accounts/",
            {
                "username": "Cthulhu",
                "password": "old+ones4eva",
                "artist_name": "R'lyeh Rockers",
                "email": "cartmanrulez@hotmail.biz",
            },
            content_type="application/json",
        )

        # login
        client.post(
            "http://localhost:8001/login/",
            {"username": "Cthulhu", "password": "old+ones4eva"},
        )

        # logout
        response = client.delete("http://localhost:8001/api/token/refresh/logout/")
        # print(response.content)
        self.assertEqual(response.status_code, 200)
