from rest_framework import serializers
from .models import Task

# @serializer task - "Form Request - Resource"
class TaskSerializer(serializers.ModelSerializer):
    
    # Modelo
    class Meta:
        model = Task
        # Todos los campos
        fields = '__all__'  
        # No pueden modificar desde el frontend
        read_only_fields = ['user', 'created_at', 'updated_at'] 
