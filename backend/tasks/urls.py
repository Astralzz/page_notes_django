from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet


# Crea un enrutador y registra el TaskViewSet con la ruta 'tasks'
router = DefaultRouter()
# El enrutador generará automáticamente las rutas CRUD para el modelo Task
router.register(r'tasks', TaskViewSet, basename='task')

# URL de la aplicación
urlpatterns = [
    path('', include(router.urls)),  
]
