from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

# ViewSet = Controller
class TaskViewSet(viewsets.ModelViewSet):
    
    # Serializer 
    serializer_class = TaskSerializer
    # Permissions
    permission_classes = [permissions.IsAuthenticated] 

    # Devuelve solo tareas del usuario autenticado (como un scope userId() en Eloquent)
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    # Asigna automáticamente el usuario a la tarea (como Auth::user()->tasks()->create([...]))
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

 