from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


# Front end gets JWT for logged in user from here
@require_http_methods(["GET"])
def api_user_token(request):
    if "jwt_access_token" in request.COOKIES:
        token = request.COOKIES["jwt_access_token"]
        if token:
            return JsonResponse({"token": token})
    response = JsonResponse({"token": None})
    return response
