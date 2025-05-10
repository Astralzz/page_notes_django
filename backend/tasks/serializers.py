from rest_framework import serializers
from .models import Task


"""
Serializer de validaciones base de las notas.
"""
class BaseTaskSerializerValidator(serializers.ModelSerializer):
    
    # Campos del modelo a validar
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        error_messages={
            'required': 'El usuario es obligatorio.',
            'blank': 'El usuario no puede estar vacío.'
        }
    )
    
    title = serializers.CharField(
        max_length=100,
        allow_blank=True,
        error_messages={
            'max_length': 'El nombre no puede tener más de 100 caracteres.',
            'required': 'El nombre es obligatorio.',
            'blank': 'El nombre no puede estar vacío.'
        }
    )
    
    description = serializers.CharField(
        max_length=1200,
        allow_blank=True,
        required=True,
        error_messages={
            'max_length': 'La descripción no puede tener más de 1200 caracteres.',
            'blank': 'La descripción no puede estar vacía.',
            'required': 'La descripción es obligatoria.'
        }
    )
    
    completed = serializers.BooleanField(
        default=False,
        error_messages={
            'required': 'El estado de la tarea es obligatorio.'
        }
    )

    class Meta:
        model = Task
        fields = ('title', 'description', 'completed')


# @serializer task - "Form Request - Resource"
class TaskViewSerializer(BaseTaskSerializerValidator):
    
    # Modelo
    class Meta:
        model = Task
        # Todos los campos
        # fields = '__all__'  
        fields = ('id', 'title', 'description', 'completed')
        # No pueden modificar desde el frontend
        read_only_fields = ['user', 'created_at', 'updated_at'] 
