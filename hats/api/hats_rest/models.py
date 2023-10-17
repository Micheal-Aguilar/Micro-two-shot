from django.db import models

# Create your models here.


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200)
    closet_name = models.CharField(max_length=200)
    section_number = models.PositiveSmallIntegerField(null=True)
    shelf_number = models.PositiveSmallIntegerField(null=True)


class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField()
    location = models.ForeignKey(
        LocationVO, related_name="hats", on_delete=models.CASCADE
    )
