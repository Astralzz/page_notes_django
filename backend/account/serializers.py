from django.contrib.auth import get_user_model
from rest_framework import serializers
from tasks.serializers import TaskViewSerializer
from .validators import validate_photo_size, validate_photo_format
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from .models import Profile

# Modelo
t_user = get_user_model()

"""
Serializer de validaciones base el modelo Profile.
"""
class BaseProfileSerializerValidator(serializers.ModelSerializer):
    
    # Campos del modelo a validar
    nombre = serializers.CharField(
        max_length=100,
        allow_blank=True,
        error_messages={
            'max_length': 'El nombre no puede tener más de 100 caracteres.',
            'required': 'El nombre es obligatorio.',
            'blank': 'El nombre no puede estar vacío.'
        }
    )
    
    apellido = serializers.CharField(
        max_length=100,
        allow_blank=True,
        error_messages={
            'max_length': 'El apellido no puede tener más de 100 caracteres.',
            'required': 'El apellido es obligatorio.',
            'blank': 'El apellido no puede estar vacío.'
        }
    )

    telefono = serializers.CharField(
        max_length=20,
        allow_blank=True,
        required=False,
        error_messages={
            'max_length': 'El teléfono no puede tener más de 20 caracteres.',
            'blank': 'El teléfono no puede estar vacío.'
        }
    )

    foto = serializers.ImageField(
        required=False,
        allow_null=True,
        validators=[validate_photo_size, validate_photo_format],
        error_messages={
            'invalid_image': 'La imagen subida no es válida.',
            'max_length': 'La imagen no puede tener más de 3 MB.',
            'required': 'La imagen es obligatoria.',
            'invalid': 'El formato de la imagen no es válido.',
            'blank': 'La imagen no puede estar vacía.'
        },
    )

    class Meta:
        model = Profile
        fields = ('nombre', 'apellido', 'telefono', 'foto')

"""
Serializer para la creación de perfil.

- nombre y apellido requeridos.
"""
class ProfileCreateSerializer(BaseProfileSerializerValidator):
    # Campos del modelo a validar
    class Meta(BaseProfileSerializerValidator.Meta):
        extra_kwargs = {
            'nombre': {'required': True},
            'apellido': {'required': True}
        }

"""
Serializer para la actualización de perfil.

- nombre y apellido opcionales.
"""
class ProfileUpdateSerializer(BaseProfileSerializerValidator):
    # Campos del modelo a validar
    class Meta(BaseProfileSerializerValidator.Meta):
        extra_kwargs = {
            'nombre': {'required': False},
            'apellido': {'required': False}
        }

"""
Serializer para visualizar el perfil.
"""
class ProfileReadSerializer(serializers.ModelSerializer):
    # Método para obtener la URL completa de la foto
    foto_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('nombre', 'apellido', 'telefono', 'foto', 'foto_url')
    
    def get_foto_url(self, obj):
        # Verificar si la foto existe
        if obj.foto:
            # Verifica si request está disponible en el contexto
            request = self.context.get('request')
            if request:
                # Devuelve la URL completa usando la URL del servidor
                return request.build_absolute_uri(obj.foto.url)
            # Si no hay request (por ejemplo, en entorno de localhost), construir manualmente
            return f'http://localhost:8000{obj.foto.url}'
        return None

"""
Serializador para registro de User - Profile.
"""
class RegisterProfileSerializer(serializers.ModelSerializer):
    
    # Perfil y password
    profile = ProfileCreateSerializer(write_only=True, required=True)
    password = serializers.CharField(write_only=True)

    # Modelo de usuario
    class Meta:
        model = t_user
        fields = ('username', 'email', 'password', 'profile')
        extra_kwargs = {
            'username': {'error_messages': {
                'blank': 'El nombre de usuario no puede estar vacío.',
                'required': 'El nombre de usuario es obligatorio.',
                'unique': 'Este nombre de usuario ya está en uso.'
            }},
            'email': {'error_messages': {
                'blank': 'El correo no puede estar vacío.',
                'required': 'El correo es obligatorio.',
                'invalid': 'El formato del correo no es válido.',
                'unique': 'Este correo ya está registrado.'
            }},
            'password': {'error_messages': {
                'blank': 'La contraseña no puede estar vacía.',
                'required': 'La contraseña es obligatoria.',
                'min_length': 'La contraseña debe tener al menos 8 caracteres.',
                'max_length': 'La contraseña no puede tener más de 128 caracteres.'
            }},
            'profile': {'error_messages': {
                'blank': 'El perfil no puede estar vacío.',
                'required': 'El perfil es obligatorio.'
            }}
        }

    """
    Validar contraseña
    """
    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    """
    Crear perfil
    """
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = t_user.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

"""
Serializador para actualizar datos de User + Profile.
"""
class UpdateProfileSerializer(serializers.ModelSerializer):
    
    # Perfil
    profile = ProfileUpdateSerializer(required=False)

    # Modelo de usuario
    class Meta:
        model = t_user
        fields = ('id', 'username', 'email', 'profile')
        extra_kwargs = {
            'username': {'required': False},
            'email': {'required': False}
        }

    """
    Actualizar el perfil.
    """
    def update(self, instance, validated_data):
        
        # Perfil
        profile_data = validated_data.pop('profile', {})

        # Actualizar el usuario
        for attr, value in validated_data.items():
            # ? Si el campo es password
            if attr == 'password':
                instance.set_password(value) # Encriptar contraseña
            else:
                setattr(instance, attr, value)
        instance.save()

        # Actualizar el perfil
        if profile_data:
            Profile.objects.filter(user=instance).update(**profile_data)

        return instance

"""
Serializador para visualizar datos de User + Profile.
"""
class UserProfileDetailSerializer(serializers.ModelSerializer):
    
    # Perfil
    profile = ProfileReadSerializer(read_only=True)
    tasks = TaskViewSerializer(many=True, read_only=True)

    class Meta:
        model = t_user
        fields = ('id', 'username', 'email', 'profile', 'tasks')