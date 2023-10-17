from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)
    bin_number = models.PositiveSmallIntegerField(null=True)
    bin_size = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return f"{self.closet_name} - {self.bin_number}/{self.bin_size}"

class Shoe(models.Model):
    model_name = models.CharField(max_length=200)
    manufacturer_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField()
    assigned_bin = models.ForeignKey(BinVO, related_name="shoes", on_delete=models.CASCADE)

    def __str__(self):
        return self.model_name

    def get_api_url(self):
        return reverse("api_list_shoes", kwargs={"pk": self.pk})
