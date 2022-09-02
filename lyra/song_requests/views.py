from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Song, Category
from .json import ModelEncoder
import json
import djwto.authentication as auth

class CategoryEncoder(ModelEncoder):
    model = Category
    properties = ["id", "name"]


class SongEncoder(ModelEncoder):
    model = Song
    properties = [
        "id",
        "title",
        "artist",
        "owner_artist",
        "category_id",
        "is_requested",
        "is_requestable",
    ]
    encoders = {CategoryEncoder}


@require_http_methods(["GET", "POST"])
@auth.jwt_login_required
def api_songs(request):
    if request.method == "GET":
        songs = Song.objects.all()
        return JsonResponse({"songs": songs}, encoder=SongEncoder, safe=False)
    else:
        # json.loads() requires type string, bytes, or bytearray, so we can't directly
        # pass in the dict from the request. E.g. json.dumps(request.payload) won't work.
        dict_from_payload = json.dumps(request.payload)
        user_info = json.loads(dict_from_payload)
        user_id = user_info["user"]["id"]

        content = json.loads(request.body)
        content["owner_artist"] = user_id
        try:
            category = Category.objects.get(id=content["category"])
            content["category"] = category
        except Category.DoesNotExist:
            return JsonResponse({"message": "category does not exist"}, status=404)
        song = Song.objects.create(**content)
        return JsonResponse(song, encoder=SongEncoder, safe=False)


@require_http_methods(["GET", "PUT"])
@auth.jwt_login_required
def api_song(request, pk):
    song = Song.objects.get(id=pk)
    if request.method == "GET":
        return JsonResponse(song, encoder=SongEncoder, safe=False)
    else:
        content = json.loads(request.body)
        Song.objects.filter(id=pk).update(**content)
        return JsonResponse(song, encoder=SongEncoder, safe=False)


@require_http_methods(["GET", "POST"])
@auth.jwt_login_required
def api_categories(request):
    if request.method == "GET":
        categories = Category.objects.all()
        return JsonResponse(
            {"categories": categories}, encoder=CategoryEncoder, safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            category = Category.objects.create(**content)
        except IntegrityError:
            return JsonResponse(
                {"message": "Category with same name already exists."}, status=409
            )
        return JsonResponse(category, encoder=CategoryEncoder, safe=False)


@require_http_methods(["GET", "PUT"])
@auth.jwt_login_required
def api_category(request, pk):
    category = Category.objects.get(id=pk)
    if request.method == "GET":
        return JsonResponse(category, encoder=CategoryEncoder, safe=False)
    else:
        content = json.loads(request.body)
        Category.objects.filter(id=pk).update(**content)
        return JsonResponse(category, encoder=CategoryEncoder, safe=False)
