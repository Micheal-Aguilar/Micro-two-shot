from django.urls import path
from .views import api_list_shoes, api_show_shoe

urlpatterns = [
    path('shoes/', api_list_shoes, name="api_create_shoe"),
    path('bin/<int:bin_vo_id>/shoes/', api_list_shoes, name="api_list_shoes"),
    path('shoes/<int:id>/', api_show_shoe, name="api_show_shoe"),
]
