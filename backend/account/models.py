from django.db import models
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import uuid
import os

def user_profile_image_path(instance, filename):
    # Obtener la extensión del archivo
    ext = filename.split('.')[-1]
    # Generar un nombre único usando UUID
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    # Retornar la ruta: profiles/user_<id>/<nombre_unico>.<ext>
    return os.path.join('profiles', f'user_{instance.user.id}', unique_filename)


class Profile(models.Model):
    """
      - user - FK a User, elimina perfil al borrar usuario
      - nombre: texto breve (max 100)
      - apellido: texto breve (max 100)
      - telefono: texto breve (max 20)
      - foto: imagen, opcional
      - created_at: timestamp automático
      - updated_at: timestamp automático
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    nombre = models.CharField(max_length=100, blank=True)
    apellido = models.CharField(max_length=100, blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    foto = models.ImageField(upload_to=user_profile_image_path, null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Si el perfil ya existe en la base de datos
        if self.pk:
            old_instance = Profile.objects.get(pk=self.pk)
            # Si la foto ha cambiado y existía una anterior
            if old_instance.foto and old_instance.foto != self.foto:
                old_instance.foto.delete(save=False)  # Eliminar la foto antigua
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - Profile"