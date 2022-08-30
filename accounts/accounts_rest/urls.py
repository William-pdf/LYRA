from django.urls import path
from .views import (
    api_user_token,
    api_current_user,
    api_create_account,
    api_account_detail,
)


urlpatterns = [
    path("tokens/mine/", api_user_token, name="api_user_token"),
    path("tokens/me/", api_current_user, name="api_current_user"),
    path("accounts/", api_create_account, name="api_create_account"),
    path("accounts/<int:id>/", api_account_detail, name="api_account_detail"),
]
