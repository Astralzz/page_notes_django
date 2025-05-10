from rest_framework import serializers

# Var globales
MAX_PHOTO_SIZE = 3 * 1024 * 1024 # 3 MB
ALLOWED_CONTENT_TYPES = ['image/png', 'image/jpeg'] # Tipos de contenido permitidos
ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg'] # Extensiones permitidas

"""
 Valida que el tamaño de la imagen no exceda MAX_PHOTO_SIZE.
"""
def validate_photo_size(value):

    if value.size > MAX_PHOTO_SIZE:
        raise serializers.ValidationError('La imagen debe pesar menos de 3 MB.')

"""
Valida que el tipo de contenido y la extensión de la imagen sean válidos.
"""
def validate_photo_format(value):
    
    # ? Formato invalido
    if value.content_type not in ALLOWED_CONTENT_TYPES:
        raise serializers.ValidationError('Solo se permiten formatos PNG y JPG.')

    # ? Extension invalida
    ext = f".{value.name.rsplit('.', 1)[-1].lower()}"
    if ext not in ALLOWED_EXTENSIONS:
        raise serializers.ValidationError('Solo se permiten formatos PNG y JPG.')