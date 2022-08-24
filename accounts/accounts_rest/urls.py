from django.urls import path
from .views import api_user_token


urlpatterns = [
    path('tokens/mine', api_user_token, name='api_user_token')
]
