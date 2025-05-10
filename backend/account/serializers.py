from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

# @serializer perfile - "Form Request - Resource"
class RegisterSerializer(serializers.ModelSerializer):
    
    # Campos para serialización
    password = serializers.CharField(write_only=True)
    nombre = serializers.CharField(
    max_length=100,
    write_only=True,
    required=False,
    allow_blank=True
    )
    apellido = serializers.CharField(
        max_length=100, 
        write_only=True, 
        required=False, 
        allow_blank=True
    )
    telefono = serializers.CharField(
        max_length=20, 
        write_only=True, 
        required=False, 
        allow_blank=True
    )
    foto = serializers.ImageField(
        write_only=True, 
        required=False, 
        allow_null=True
    )

    # Modelo
    class Meta:
        model = User
        # Campos a serializar
        fields = ('username', 'email', 'password')

    # Validación de datos
    def create(self, validated_data):
        # Extraer datos del perfil
        nombre = validated_data.pop('nombre', '')
        apellido = validated_data.pop('apellido', '')
        telefono = validated_data.pop('telefono', '')
        foto = validated_data.pop('foto', None)

        # Crear usuario
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )

        # Crear perfil asociado
        Profile.objects.create(
            user=user,
            nombre=nombre,
            apellido=apellido,
            telefono=telefono,
            foto=foto
        )

        return user
    
# @serializer - Actualización y Detalles
class UserProfileSerializer(serializers.ModelSerializer):
    
    # Campos para serialización
    nombre = serializers.CharField(source='profile.nombre', required=True)
    apellido = serializers.CharField(source='profile.apellido', required=True)
    telefono = serializers.CharField(source='profile.telefono', required=True)
    foto = serializers.ImageField(source='profile.foto', required=False)

    # Modelo
    class Meta:
        model = User
        fields = (
            'id', 
            'username', 
            'email', 
            'nombre',
            'apellido', 
            'telefono', 
            'foto', 
        )
        extra_kwargs = {
            'username': {'required': False},
            'email': {'required': False}
        }
    # Actualizar datos del usuario
    def update(self, instance, validated_data):
       
        # Actualizar datos del usuario
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Actualizar datos del perfil
        profile_data = validated_data.get('profile', {})
        profile = instance.profile
        profile.nombre = profile_data.get('nombre', profile.nombre)
        profile.apellido = profile_data.get('apellido', profile.apellido)
        profile.telefono = profile_data.get('telefono', profile.telefono)
        
        # Si se proporciona una nueva foto, actualizarla
        if 'foto' in profile_data:
            profile.foto = profile_data['foto']
        profile.save()

        return instance