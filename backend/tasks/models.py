from django.db import models
from django.contrib.auth.models import User

# @model Task - Modelo de Tarea
class Task(models.Model):
    """
      - title: texto breve (max 255)
      - description: texto largo, opcional
      - completed: booleano (por defecto False)
      - created_at: timestamp automático
      - updated_at: timestamp automático
      - user: FK a User, elimina tareas al borrar usuario
    """
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Relación con el usuario que creó la tarea
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.title