from django.db import models
from django.utils.translation import gettext as _

class Furniture(models.Model):
    name = models.CharField(_("Furniture Name"), max_length=50, unique=True)

    def __str__(self):
        return self.name