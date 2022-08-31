import json

import djwto.authentication as auth
from django.db import IntegrityError
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods

from .models import CustomUser


class AccountSignupEncoder(ModelEncoder):
    model = CustomUser
    properties = ["id", "username", "email"]


class AccountDetailEncoder(ModelEncoder):
    model = CustomUser
    properties = ["id", "username", "email", "artist_name"]


# Front end gets JWT for logged in user from here
@require_http_methods(["GET"])
def api_user_token(request):
    if "jwt_access_token" in request.COOKIES:
        token = request.COOKIES["jwt_access_token"]
        if token:
            return JsonResponse({"token": token})
    response = JsonResponse({"token": None})
    return response


@require_http_methods(["GET"])
@auth.jwt_login_required
def api_current_user(request):
    user_id = request.payload["user"]["id"]
    user = CustomUser.objects.get(id=user_id)
    return JsonResponse(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "artist_name": user.artist_name,
        }
    )


def create_user(json_content):
    try:
        content = json.loads(json_content)
    except json.JSONDecodeError:
        return 400, {"message": "Bad JSON"}, None

    required_properties = [
        "username",
        "email",
        "password",
    ]
    missing_properties = []
    for required_property in required_properties:
        if required_property not in content or len(content[required_property]) == 0:
            missing_properties.append(required_property)
    if missing_properties:
        response_content = {
            "message": "missing properties",
            "properties": missing_properties,
        }
        return 400, response_content, None

    try:
        account = CustomUser.objects.create_user(
            username=content["username"],
            email=content["email"],
            password=content["password"],
        )
        return 200, account, account
    except IntegrityError as e:
        return 409, {"message": str(e)}, None
    except ValueError as e:
        return 400, {"message": str(e)}, None


@require_http_methods(["GET", "PUT", "DELETE"])
def api_account_detail(request, id):
    try:
        account = CustomUser.objects.filter(is_active=True).get(id=id)
    except CustomUser.DoesNotExist:
        response = JsonResponse({"message": f"User with id of {id} does not exist."})
        response.status_code = 404
        return response

    if request.method == "GET":
        return JsonResponse(account, encoder=AccountDetailEncoder, safe=False)
    elif request.method == "PUT":
        content = json.loads(request.body)
        for field in content:
            setattr(account, field, content[field])
        account.save()
        return JsonResponse(account, encoder=AccountDetailEncoder, safe=False)
    else:
        account.is_active = False
        account.save()
        return JsonResponse({"message": "User successfully deleted."})


@require_http_methods(["POST"])
def api_create_account(request):
    status_code, response_content, _ = create_user(request.body)
    response = JsonResponse(
        response_content,
        encoder=AccountSignupEncoder,
        safe=False,
    )
    response.status_code = status_code
    return response
