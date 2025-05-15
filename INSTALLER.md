# INSTALLER APP

## ✅ **Instalación Completa**

### 🔹 1. Requisitos Previos (Frontend y Backend)

Asegúrate de tener instalado:

| Herramienta | Recomendado         |
| ----------- | ------------------- |
| Python      | 3.11+               |
| Node.js     | 18+ (incluye `npm`) |
| PostgreSQL  | Última versión      |
| Git         | Última versión      |

Descargar proyecto desde el repositorio de `GitHub`

[Repositorio en gitHub](https://github.com/Astralzz/page_notes_django.git)

```bash
git clone https://github.com/Astralzz/page_notes_django.git
```

---

## 🐍 **Backend (Django + DRF)**

### 🔹 2. Crear entorno virtual

Pn cmd en la carpeta `backend`:

```bash
python -m venv venv
source venv/bin/activate      # En Linux/macOS
venv\Scripts\activate         # En Windows
```

### 🔹 3. Instalar dependencias

Usan `requirements.txt`. dentro de `backend`, Si no existe, crearlo con las librerías usadas:

```bash
pip install -r requirements.txt
```

Si no tienes el archivo `requirements.txt`, puedes crearlo así:

```bash
pip install django djangorestframework psycopg2-binary django-cors-headers djangorestframework-simplejwt django-seed
pip freeze > requirements.txt
```

### 🔹 4. Configurar `.env`

Ya lo mencionaste, pero asegúrate de crearlo correctamente en la raíz del backend:

```env
DB_NAME=notasdb
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=tu_clave_secreta
DEBUG=True
```

Y cargarlo en tu `settings.py` usando `python-decouple` o `os.environ`.

### 🔹 5. Aplicar migraciones y crear superusuario

```bash
python manage.py migrate
```

Crear datos aleatorios `opcional`:

```bash
python manage.py seed_data --users=20 --tasks=50
```

- > La contraseña Para todos los usuarios creados con semillas es `password123`

- > Asegúrate de que `manage.py` esté apuntando a `settings.dev` si tienes múltiples configuraciones.

---

## ⚛️ **Frontend (Vite + React + TS + Tailwind)**

### 🔹 6. Instalar dependencias del frontend

Desde la carpeta del frontend (`frontend`, `client`, o como la hayas llamado):

```bash
npm install
```

> Asegúrate de que tienes el archivo `package.json` y los siguientes scripts estén definidos:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "format": "prettier --write .",
  "test": "vitest",
  "analyze": "vite build --analyze"
}
```

### 🔹 7. Iniciar frontend

```bash
npm run dev
```

Asegúrate de que las **llamadas al backend usen la URL correcta**, por ejemplo:

```ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

En `.env` del frontend:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## ✅ Finalizar y Probar

1. Asegúrate de que PostgreSQL esté corriendo y la base de datos esté creada.
2. Corre el backend:

```bash
python manage.py runserver --settings=server.settings.dev
```

3. Corre el frontend:

```bash
npm run dev
```

4. Abre tu navegador:

   * Frontend: [http://localhost:5173](http://localhost:5173)
   * Backend API: [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 🧪 Verificación rápida

Verifica:

* [ ] Puedes registrarte e iniciar sesión desde el frontend.
* [ ] Se almacenan JWT tokens correctamente.
* [ ] El frontend consume el API y muestra notas.
* [ ] Las rutas protegidas funcionan bien con Redux y guards.
* [ ] CORS no bloquea las peticiones.
