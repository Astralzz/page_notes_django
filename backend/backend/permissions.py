from rest_framework import permissions

# Permiso personalizado - Usuarios
class IsOwnerOrAdmin(permissions.BasePermission):
    # Verificar los permisos de la solicitud
    def has_object_permission(self, request, view, obj):
        # Si el objeto tiene un campo 'user'
        if hasattr(obj, 'user'):
            return obj.user == request.user or request.user.is_staff
        # Si el objeto es un User directamente
        return obj == request.user or request.user.is_staff


# Permiso personalizado - Notas
class IsOwnerTasks(permissions.BasePermission):
    # Solo el dueño o un superusuario puede modificar/ver/eliminar
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'user'):
            return obj.user == request.user or request.user.is_staff
        return obj == request.user or request.user.is_staff
