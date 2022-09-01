import djwto.authentication as auth
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Song, Category
from .json import ModelEncoder
import json

# Create your views here.


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
    ]
    encoders = {CategoryEncoder}


@require_http_methods(["GET", "POST"])
@auth.jwt_login_required
def api_songs(request):
    if request.method == "GET":
        songs = Song.objects.all()
        return JsonResponse({"songs": songs}, encoder=SongEncoder, safe=False)
    else:
        content = json.loads(request.body)
        # try:
        #     band = request.user.band.id
        #     content["owner_band"] = band
        # except:
        #     return JsonResponse(
        #         {'message': "band does not exist or user is not logged in"}
        # )
        try:
            # TODO: Change to look up by category id for consistency?
            category = Category.objects.get(id=content["category"])
            content["category"] = category
        except Category.DoesNotExist:
            return JsonResponse({"message": "category does not exist"})
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
        category = Category.objects.create(**content)
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
