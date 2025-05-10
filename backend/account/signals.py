import os
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import Profile


"""
Elimina la imagen de perfil del usuario al eliminar el perfil.
"""
@receiver(pre_delete, sender=Profile)
def delete_profile_image(sender, instance, **kwargs):
    # ? la imagen existe
    if instance.foto:
        # ? la ruta de la imagen existe
        if os.path.isfile(instance.foto.path):
            os.remove(instance.foto.path) # Eliminar la imagen
