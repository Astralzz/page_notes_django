from django.core.management.base import BaseCommand
from account.seeders import UserFactory, ProfileFactory, TaskFactory

# @seed - Datos de prueba para usuarios, perfiles y tareas
class Command(BaseCommand):
    
    # Descripción del comando
    help = 'Crea datos de prueba para usuarios, perfiles y tareas'

    # Argumentos del comando
    # --users: Número de usuarios a crear
    # --tasks: Número de tareas a crear
    def add_arguments(self, parser):
        parser.add_argument('--users', type=int, default=10, help='Número de usuarios a crear')
        parser.add_argument('--tasks', type=int, default=50, help='Número de tareas a crear')

    # Modelo de tarea
    def handle(self, *args, **options):
        # Crear usuarios con perfiles
        for _ in range(options['users']):
            user = UserFactory()
            # Perfil
            ProfileFactory(user=user) 

        # Crear tareas
        TaskFactory.create_batch(options['tasks'])

        # Mensaje de éxito
        self.stdout.write(self.style.SUCCESS(
            f'¡Creados {options["users"]} usuarios con perfiles y {options["tasks"]} tareas!'
        ))