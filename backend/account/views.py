from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import RegisterProfileSerializer, UpdateProfileSerializer, UserProfileDetailSerializer
from rest_framework import generics, permissions, filters
from rest_framework.exceptions import NotFound, AuthenticationFailed
from backend.permissions import IsOwnerOrAdmin
from rest_framework.response import Response
from rest_framework.views import APIView


# Obtener user por token
class CurrentUserViewToken(APIView):
    
    # Datos
    permission_classes = [permissions.IsAuthenticated]

    # Get response
    def get(self, request):
        
        try: 
            # ? El token no está presente o no es válido
            if not request.user.is_authenticated:
                raise AuthenticationFailed("La autenticación ha caducado o no es válida.")
            
            # ? El usuario no es quien debería ser (por ejemplo, token pertenece a otro usuario)
            if request.user != request.user: 
                raise AuthenticationFailed("El usuario no está autenticado correctamente.")
            
            # Si las verificaciones pasan, devuelve la información del perfil
            serializer = UserProfileDetailSerializer(request.user)
            return Response(serializer.data)
        
        except AuthenticationFailed:
            # Capturamos la excepción y devolvemos un mensaje genérico
            raise AuthenticationFailed("La autenticación ha fallado.")

    
# Registro 
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterProfileSerializer
    permission_classes = [permissions.AllowAny]  # Registros sin login

# Listar Usuarios 
class UserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserProfileDetailSerializer
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
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    # Obtener el usuario o actualizar
    def get_serializer_class(self):
        try:
            # ? Es solicitud PUT
            if self.request.method == 'PUT':
                return UpdateProfileSerializer # PUT - Actualizar perfil
            return UserProfileDetailSerializer # GET - Ver perfil
        except User.DoesNotExist:
            raise NotFound("Este usuario no existe o no fue encontrado.")

    # ! Eliminar usuario y su perfil (CASCADE)
    def perform_destroy(self, instance):
        instance.delete()