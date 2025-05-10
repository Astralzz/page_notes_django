import random
import urllib.request
from tempfile import NamedTemporaryFile
from django.core.files import File
from django.contrib.auth.models import User
from account.models import Profile
from tasks.models import Task
import factory
from factory.django import DjangoModelFactory
from faker import Faker

fake = Faker()

# Factory para User (sin cambios)
class UserFactory(DjangoModelFactory):
    
    # Modelo de usuario
    class Meta:
        model = User

    # Datos de usuario
    username = factory.LazyAttribute(lambda _: fake.user_name())
    email = factory.LazyAttribute(lambda _: fake.email())
    password = factory.PostGenerationMethodCall('set_password', 'password123')

# Factory para Profile
class ProfileFactory(DjangoModelFactory):
    
    # Modelo de perfil
    class Meta:
        model = Profile

    # Datos de perfil
    user = factory.SubFactory(UserFactory)
    nombre = factory.LazyAttribute(lambda _: fake.first_name())
    apellido = factory.LazyAttribute(lambda _: fake.last_name())
    telefono = factory.LazyFunction(lambda: fake.phone_number()[:20])

    @factory.post_generation
    def foto(self, create, extracted, **kwargs):
        
        # Generar imagen aleatoria
        if not create or not self.user: 
            return

        try:
            # Recorrer la imagen aleatoria
            with NamedTemporaryFile(delete=True, suffix='.jpg') as img_temp:
                response = urllib.request.urlopen(
                    f"https://i.pravatar.cc/300?img={random.randint(1, 70)}"
                )
                img_temp.write(response.read())
                img_temp.seek(0)  # Posicionar el cursor al inicio
                self.foto.save(
                    f"profile_{self.user.username}.jpg", 
                    File(img_temp)
                )
        # ! Error
        except Exception as e:
            print(f"Error generando imagen: {str(e)}")

# Factory para Task
class TaskFactory(DjangoModelFactory):
    
    # Modelo de tarea
    class Meta:
        model = Task

    # Datos de tarea
    title = factory.LazyAttribute(lambda _: fake.sentence(nb_words=6))
    description = factory.LazyAttribute(lambda _: fake.paragraph(nb_sentences=3))
    completed = factory.LazyAttribute(lambda _: fake.boolean(chance_of_getting_true=30))
    
    # Evitar consulta directa a la base de datos
    user = factory.LazyFunction(lambda: User.objects.order_by('?').first())