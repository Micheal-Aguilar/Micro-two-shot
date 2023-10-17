from django.shortcuts import render
from .models import Shoe, BinVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href", "bin_number", "bin_size"]
class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name", "manufacturer_name", "color", "picture_url", "assigned_bin"]
    encoders = {"assigned_bin": BinVOEncoder()}

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(assigned_bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse({'shoes': shoes}, encoder=ShoeListEncoder)
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["assigned_bin"]
            assigned_bin = BinVO.objects.get(import_href=bin_href)
            content['assigned_bin'] = assigned_bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(shoe, encoder=ShoeListEncoder, safe=False)
