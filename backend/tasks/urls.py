from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Ruta base
RUTA_BASE = 'tasks'

"""
Enrutador de URL para la aplicación de tareas.

- Este archivo define las rutas de la API para las tareas.
- Utiliza el enrutador predeterminado de Django REST Framework para registrar
  el conjunto de vistas de tareas.
- El conjunto de vistas de tareas maneja las operaciones CRUD para las tareas.
- La URL base para las tareas es 'tasks/' y el nombre del conjunto de vistas es
  'task'.

- Rutas:
  - GET /tasks/ - Listar todas las tareas
  - POST /tasks/ - Crear una nueva tarea
  - GET /tasks/{id}/ - Obtener una tarea específica
  - PUT /tasks/{id}/ - Actualizar una tarea específica
  - DELETE /tasks/{id}/ - Eliminar una tarea específica
"""
router = DefaultRouter()
router.register(RUTA_BASE, TaskViewSet, basename='task')
urlpatterns = router.urls
