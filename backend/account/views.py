from rest_framework import generics, permissions, pagination
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserProfileSerializer
from rest_framework import generics, permissions, pagination, filters

# Permiso personalizado - Solo el admin puede [actualizar o eliminar]
class IsOwnerOrAdmin(permissions.BasePermission):
    # Verificar los permisos de la solicitud
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff

# Registro 
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # Registros sin login

# Listar Usuarios 
class UserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAdminUser]  # Solo admins pueden listar
    
    # Filtros de búsqueda
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'username', 
        'email', 
        'profile__nombre', # 'nombre' del perfil
        'profile__apellido', # 'apellido' del perfil
        'profile__telefono' # 'telefono' del perfil
    ]


# Detalles, Actualizar y Eliminar
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    
    # Permisos
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    # Eliminar usuario y su perfil (CASCADE)
    def perform_destroy(self, instance):
        instance.delete()