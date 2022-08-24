from django.urls import path
from .views import register_new_user


urlpatterns = [
    path('signup/', register_new_user, name="signup")
]
