from django.db import models


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200)
    closet_name = models.CharField(max_length=200)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
