from django.shortcuts import render

# Create your views here.

from .models import Hat, LocationVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style_name", "color", "picture_url", "location"]
    encoders = {"location": LocationVOEncoder()}


# @require_http_methods(["GET", "POST"])
# def api_list_hats(request):
#     if request.method == "GET":
#         hats = Hat.objects.all()
#         return JsonResponse({"hats": hats}, encoder=HatListEncoder)
#     else:
#         content = json.loads(request.body)
#         try:
#             location_href = content["location"]
#             location = LocationVO.objects.get(import_href=location_href)
#             content["location"] = location
#         except LocationVO.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid location id"},
#                 status=400,
#             )

#         hat = Hat.objects.create(**content)
#         return JsonResponse(hat, encoder=HatListEncoder, safe=False)

@require_http_methods(['GET', 'POST'])
def api_list_hats(request, location_vo_id=None):
    if request.method == 'GET':
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {'hats': hats},
            encoder=HatListEncoder,
            safe=False
                )
    else:
        content = json.loads(request.body)
        # pull in location detail through location id
        try:
            location_href = f'/api/locations/{location_vo_id}/'
            location = LocationVO.objects.get(import_href=location_href)
            content['location'] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid location ID'}
            )
        # Now let's FINALLY make some damn hats: aka HABERDASHER
        hats = Hat.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatListEncoder,
            safe=False
        )
