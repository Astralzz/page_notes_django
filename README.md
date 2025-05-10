# PAGINA NOTAS DJANGO

## COMANDOS

Migrar los datos a la BD

    python manage.py migrate

Actualizar los modelos del proyecto

    python manage.py makemigrations

Crear un super usuario

    python manage.py createsuperuser

Ejecutar el servidor de Django

    python manage.py runserver

Verificar problemas en nuestro proyecto

    python manage.py check

Crear nueva sub aplicacion

    python manage.py startapp name_sub_application

Verificar si una sub aplicacion correctamente creada

    python manage.py check applicationTwo

Insertar n semillas aleatorios

    python manage.py seed_data --users=20 --tasks=50
