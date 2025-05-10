from django.db import models
from django.contrib.auth.models import User

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
    foto = models.ImageField(upload_to='profiles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Profile"
