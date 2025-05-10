from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, filters
from backend.permissions import IsOwnerTasks
from .serializers import TaskViewSerializer
from .models import Task

class TaskViewSet(viewsets.ModelViewSet):
    
    # Conjunto de vistas para las tareas
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskViewSerializer
    
    # Permisos
    permission_classes = [IsAuthenticated, IsOwnerTasks]  

    # Filtros
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']  # Filtrado por el título de la tarea
    
    # Lista de tareas
    def get_queryset(self):
        # ? El usuario es un super usuario
        if self.request.user.is_staff:
            # Devuelvo todas las tareas
            return Task.objects.all().order_by('-created_at')
        # Devuelvo solo las tareas del usuario autenticado
        return Task.objects.filter(user=self.request.user).order_by('-created_at')

    # Al crear una tarea
    def perform_create(self, serializer):
        # Asignar el usuario automáticamente a la tarea cuando se crea
        serializer.save(user=self.request.user)

    # Al actualizar una tarea
    def perform_update(self, serializer):
        # ? La tarea esta completada
        # if serializer.validated_data.get('completed') == True:
        #     # Lógica adicional
        #     pass
        serializer.save()
