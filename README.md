# 📒 Notas App — Plataforma de Gestión de Notas Personales

## Vite + React + TypeScript + Tailwind CSS | Django + DRF + PostgreSQL

## 📌 Contacto

* **Portafolio:** [astralzz.io](https://astralzz.github.io/)
* 📩 **Email:** [edain.cortez@outlook.com](mailto:edain.cortez@outlook.com)
* 📱 **Telegram:** [@lAstralz](https://t.me/lAstralz)
* 🔗 **LinkedIn:** [linkedin.com/in/Edain](https://www.linkedin.com/in/edain-jcc)
* 😺 **GitHub:** [github.com/Astralzz](https://github.com/Astralzz)

---

## 📌 Introducción

Este proyecto es una plataforma completa para la gestión de notas personales. Cuenta con funcionalidades como:

* **Autenticación de usuarios** (registro, inicio de sesión).
* **Administración de tareas y notas** con CRUD completo.
* **Carga y manejo de imágenes** para contenido multimedia.
* **Diseño responsivo** para mobile y desktop.
* **API REST segura** con tokens JWT.
* **Base de datos** con Postgres SQL.

[Video de prueba](https://drive.google.com/file/d/14_SYVkrw_gJhrUP2UrplZ0E34sb9EaGp/view?usp=drive_link)

Está dividido en dos partes:

| Parte      | Tecnologías principales                              | Descripción                                                             |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| 🔹 Frontend | Vite, React 19, Tailwind CSS 4.0, TypeScript         | Interfaz de usuario SPA con animaciones, validaciones y notificaciones. |
| 🔹 Backend  | Django, Django REST Framework, PostgreSQL (psycopg2) | API REST modular con autenticación JWT y gestión de datos relacionales. |

## Instalación

En el archivo INSTALLER.md

---

## 🌐 Comandos útiles

### ⚙️ Django (Backend)

| Acción                               | Comando                                                     |
| ------------------------------------ | ----------------------------------------------------------- |
| Aplicar migraciones                  | `python manage.py migrate`                                  |
| Crear nuevas migraciones             | `python manage.py makemigrations`                           |
| Crear superusuario                   | `python manage.py createsuperuser`                          |
| Ejecutar servidor de desarrollo      | `python manage.py runserver --settings=server.settings.dev` |
| Revisar errores de configuración     | `python manage.py check`                                    |
| Generar datos de prueba (seed)       | `python manage.py seed_data --users=20 --notes=100`         |
| Ejecutar pruebas unitarias           | `python manage.py test --verbosity=2`                       |
| Inspeccionar esquema de la BD        | `python manage.py inspectdb`                                |
| Limpiar migraciones y reconstruir BD | `python manage.py flush && python manage.py migrate`        |

### ⚙️ NPM / Vite (Frontend)

| Acción                              | Comando           |
| ----------------------------------- | ----------------- |
| Instalar dependencias               | `npm install`     |
| Iniciar modo desarrollo             | `npm run dev`     |
| Build para producción               | `npm run build`   |
| Ejecutar linter (ESLint)            | `npm run lint`    |
| Formatear código (Prettier)         | `npm run format`  |
| Ejecutar pruebas unitarias (Vitest) | `npm run test`    |
| Analizar bundle size                | `npm run analyze` |

---

## ⚙️ Configuraciones Realizadas

### Backend

* **Django REST Framework:** Arquitectura modular con **serializers**, **viewsets** y **routers** para endpoints claros.
* **PostgreSQL:** Base de datos relacional robusta y escalable usando **psycopg2** como adaptador de conexión.
* **JWT Auth:** Autenticación basada en tokens con **Django Simple JWT**.
* **CORS:** Configuración de **django-cors-headers** para permitir llamadas desde el frontend.
* **Seeders:** Uso de **django-seed** para generar datos de prueba automáticamente.
* **Internacionalización:** Soporte de idiomas (`es`, `en`) y gestión de zonas horarias.
* **Storage:** Manejo de archivos estáticos y uploads en `MEDIA_ROOT` con configuración de rutas.
* **Paginación y Filtros:** Límites personalizables y filtros de búsqueda en vistas de lista.

### Frontend

* **TypeScript:** Tipado estricto para mayor fiabilidad y autocompletado.
* **Tailwind CSS:** Estilos utilitarios configurados en `tailwind.config.js` para diseño rápido y responsive.
* **State Management:** **Redux Toolkit** + **Redux Persist** para gestionar y mantener el estado global.
* **Routing:** **React Router DOM** con layouts anidados y guards para rutas protegidas.
* **Forms:** **Formik** + **Yup** para validaciones declarativas y manejo de formularios.
* **Theming:** Modo oscuro/claro implementado con slice de Redux y persistencia.
* **Animaciones:** **GSAP** para transiciones suaves y microinteracciones.
* **UI Components:** **Shadcn UI** + **Lucide Icons** para componentes reutilizables.
* **Notifications:** **React Hot Toast** para toasts rápidos y configurables.
* **Error Boundaries:** Captura de errores en componentes críticos.
* **Drag & Drop:** **React Dropzone** para subir archivos con experiencia de usuario intuitiva.

---

## 📦 Librerías Usadas

### Backend — Django

* **Django 5.2.1:** Framework web de alto nivel para desarrollo rápido.
* **Django REST Framework:** Herramientas para crear APIs REST escalables.
* **Django Simple JWT:** Gestión de tokens JWT para autenticación segura.
* **django-cors-headers:** Middleware para controlar CORS entre backend y frontend.
* **django-seed:** Generador de datos de prueba para poblar la base de datos.
* **psycopg2:** Adaptador de PostgreSQL para conectar Django con la base de datos.

### Frontend — React

* **Vite:** Bundler ultrarrápido para proyectos modernos de JavaScript.
* **React 19:** Biblioteca para construir interfaces de usuario declarativas.
* **TypeScript:** Superset de JavaScript con tipado estático.
* **Tailwind CSS 4.0:** Framework de utilidades CSS para diseño ágil.
* **React Router DOM:** Enrutamiento dinámico para aplicaciones SPA.
* **Redux Toolkit:** Simplifica la configuración y uso de Redux.
* **Redux Persist:** Persiste el estado de Redux en el localStorage.
* **Formik:** Librería para manejo de formularios en React.
* **Yup:** Esquemas de validación para formularios declarativos.
* **GSAP:** Librería de animación de alto rendimiento.
* **Shadcn UI:** Conjunto de componentes UI accesibles y estilizados.
* **Lucide Icons:** Iconos escalables para interfaces.
* **React Hot Toast:** Notificaciones tipo toast fáciles de usar.
* **Axios:** Cliente HTTP para realizar peticiones al API.
* **React Error Boundary:** Componente para capturar y manejar errores.
* **Clsx:** Utility para condicionar clases CSS.
* **React Dropzone:** Soporte drag & drop para subida de archivos.
