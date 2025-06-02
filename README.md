# Gestor de Tareas con Next.js y Redux Toolkit

Este es un proyecto de gestión de tareas (To-Do List) desarrollado con Next.js 14 (App Router), React, Redux Toolkit para la gestión de estado, y PrimeReact para los componentes de UI. Se comunica con un backend separado desarrollado en Django (API RESTful).

El objetivo principal es proporcionar una interfaz de usuario moderna y eficiente para que los usuarios puedan organizar y administrar sus tareas diarias.
## 🎯 Objetivo del Proyecto

El propósito de este proyecto es demostrar una aplicación web completa y escalable utilizando un stack tecnológico moderno:

    Frontend (Next.js/React): Una interfaz de usuario interactiva y rápida, optimizada para SEO y rendimiento.
    Gestión de Estado (Redux Toolkit): Manejo centralizado y predecible del estado de la aplicación (tareas, categorías, autenticación).
    Componentes UI (PrimeReact): Utilización de una biblioteca de componentes robusta y visualmente atractiva para agilizar el desarrollo de la interfaz.
    Comunicación con Backend: Integración fluida con una API RESTful de Django para la persistencia de datos.

##✨ Características Principales

    Autenticación de Usuario: Registro e inicio de sesión para asegurar el acceso a las tareas personales.
    Gestión de Tareas (CRUD):
        Crear: Añadir nuevas tareas con título, descripción y categoría.
        Ver: Listar tareas, posiblemente filtradas por estado (pendientes/completadas).
        Actualizar: Marcar tareas como completadas.
        Eliminar: Eliminar tareas existentes.
    Categorías de Tareas: Asignación de tareas a categorías para una mejor organización.
    Diseño Responsivo: Interfaz adaptada a diferentes tamaños de pantalla.
    Mensajes de Confirmación: Uso de ConfirmDialog para acciones críticas como la eliminación de tareas.

## 💻 Tecnologías Utilizadas

    Frontend:
        Next.js 14 (App Router)
        React 18
        TypeScript
        Redux Toolkit (Gestión de estado)
        PrimeReact (Componentes UI)
        CSS Modules (para estilos por componente)
    Herramientas de Desarrollo:
        Commitizen (Para commits estandarizados)
        Husky (Para hooks de Git)
        commitlint (Para validar mensajes de commit)
    Backend (Servicio Externo):
        Django (Marco de trabajo web Python)
        Django REST Framework (Para la API RESTful)
        PostgreSQL (Base de datos, si el backend la usa)

## 📁 Estructura del Proyecto
```bash
La estructura de carpetas sigue las convenciones de Next.js App Router, organizada lógicamente:

├── public/                 # Archivos estáticos (imágenes, favicons)
├── src/
│   ├── app/                # Rutas de la aplicación y layouts de Next.js
│   │   ├── api/            # Rutas de la API de Next.js (sirven como proxy al backend de Django)
│   │   │   ├── categories/ # Rutas para categorías (ej. GET /api/categories)
│   │   │   │   └── route.ts
│   │   │   ├── auth/       # Rutas para autenticación (ej. POST /api/auth/login)
│   │   │   │   └── login/
│   │   │   │       └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   └── tasks/      # Rutas para tareas (ej. POST /api/tasks, DELETE /api/tasks/[uuid])
│   │   │       ├── [uuid]/
│   │   │       │   ├── mark-completed/
│   │   │       │   │   └── route.ts # PATCH /api/tasks/[uuid]/mark-completed
│   │   │       │   └── route.ts     # DELETE /api/tasks/[uuid]
│   │   │       └── add/             # POST  /api/tasks/add
│   │   │       └── delete/          # DELETE  /api/tasks/delete 
│   │   │       └── status/          # GET  /api/tasks/status  
│   │   └── login/          # Pra autenticación
│   │   └── logout/         # Para salir de sesión
│   │   └── task/           # Para la gestión de las tareas
│   │   └── layout.tsx      # Layout principal de la aplicación
│   │   └── page.tsx        # Página de inicio
│   ├── components/         # Componentes React reutilizables (ej. Circle, Banner, Footer, Menu)
│   ├── features/           # Módulos de Redux Toolkit (slices, thunks, types)
│   │   ├── auth/           # Lógica de autenticación (authSlice)
│   │   ├── categories/     # Lógica de categorías (categoriesSlice, useCategories hook)
│   │   └── tasks/          # Lógica de tareas (taskSlice, taskTypes)
│   ├── hooks/              # Hooks personalizados (ej. useAppDispatch, useTaskActions, useNewTaskForm)
│   ├── store/              # Configuración de la tienda Redux
│   ├── styles/             # Estilos globales y utilidades CSS
│   └── lib/                # Funciones de utilidad o configuración compartida
├── .env.example            # Ejemplo de variables de entorno donde se define el endpoint del backend
├── .env.local              # Variables de entorno locales (NO EN GIT)
├── package.json            # Dependencias y scripts del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Este archivo
```

## Requisitos de Instalación

Antes de empezar, asegúrate de tener instalado lo siguiente en tu sistema:

    Node.js: Versión 20.x o superior.
    npm (Node Package Manager) o Yarn: Incluidos con Node.js, o instalables por separado.
    Git: Para clonar el repositorio.
    Backend Django: Este frontend requiere que el backend de Django esté funcionando y accesible. Asegúrate de haber clonado y configurado el proyecto de backend por separado.


## 🚀 Instalación y Ejecución Local

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1. Clona el Repositorio:

```bash
    git clone [URL_DE_TU_REPOSITORIO_FRONTEND]
    cd [nombre-de-tu-carpeta-frontend]
```
2. Instala las Dependencias:

```bash
npm install
# O si usas Yarn:
# yarn install
```

3. Configura las Variables de Entorno:
Crea un archivo .env.local en la raíz de tu proyecto (al mismo nivel que package.json). Copia el contenido de .env.example y rellena con tus valores:
Fragmento de código

```bash
# .env.local
DJANGO_BACKEND_URL=http://localhost:8000/ # Reemplaza con la URL donde corre tu backend de Django
```

Importante: La URL de tu backend debe terminar en / si tus endpoints de Django la incluyen. Asegúrate de que el backend de Django esté corriendo en esta URL.

4. Inicia el Servidor de Desarrollo:
```bash
    npm run dev
    # O si usas Yarn:
    # yarn dev
```

La aplicación se abrirá en tu navegador en http://localhost:3000 (o el puerto que te indique Next.js).

## Despliegue

Este proyecto es una aplicación Next.js, lo que la hace ideal para desplegar en plataformas que soporten Next.js.

### Pasos Básicos para el Despliegue:

    Asegura la Accesibilidad del Backend: Tu backend de Django debe estar desplegado y accesible públicamente desde la URL que configurarás en el frontend.
    Variables de Entorno para Producción:
        En la plataforma de despliegue que elijas (Vercel, Netlify, etc.), deberás configurar la variable de entorno 
        DJANGO_BACKEND_URL con la URL pública de tu backend de Django.
    Genera la Build de Producción:
```bash
    npm run build
    # O si usas Yarn:
    # yarn build
```

## Patrones de diseño aplicados

a. **Patrón de Componentes Reutilizables**:

Se crea una carpeta components/ con componentes reutilizables que se emplean en varias pantallas, como OrderForm,
ItemList, etc. Esta separación permite que el código sea más modular y fácil de mantener.

b. **Patrón de State Management con Redux Toolkit**

Se emplea Redux Toolkit para gestionar el estado de la aplicación, como el estado de la sesión de usuario (authSlice),
las órdenes (orderSlice), y el reporte diario (reportSlice).

c. **Presentational and Container Components (Separación de lógica y UI)**

Presentational Components: Solo renderizan UI, no tienen lógica de negocio.

Container Components: Contienen lógica de negocio y manejo de estado.

d. **Hooks Patterns**

Extraer lógica reutilizable en funciones que usan hooks.

e. **Feature-Based Folder Structure**

Organizar carpetas por funcionalidad y no por tipo de archivo

f. **Feature-based Architecture (orientada a funcionalidades)**
    Este patrón organiza el código por feature o dominio de negocio. Facilita la escalabilidad.Reduce el acoplamiento entre módulos.
    Mejora la mantenibilidad y el entendimiento del código. Hace más simple trabajar en paralelo en distintos equipos o funcionalidades.

g. **Relación con Domain-Driven Design (DDD)**
    Cada carpeta dentro de features/ representa un Bounded Context. 

h. Component-Based Architecture (Arquitectura Basada en Componentes)
Este es el patrón fundamental de React. El proyecto está dividido en componentes reutilizables, 
como TaskCard, NewTaskDialog, Circle, etc.

i. API Routes / Backend for Frontend (BFF) Pattern (Patrón de Rutas de API / Backend para el Frontend)

Uso de las API Routes de Next.js (src/app/api/...) para intermediar entre el frontend y el backend de Django 
es un ejemplo del patrón BFF.

## Optimización

Se realizó optimización aplicado lazo load con componentes dinámicos dentro del componente TaskList, para cargar dinámicamente
el componente TaskCard.

Además se aplicó memory caché a las peticiones del lado del servidor de Next JS a las categorías porque 
conceptualmente cambian poco. Se utilizó node-cache.

Se optimizó además utilizando la memoización de componentes. Se le aplicó a TaskCard, Circle.

Además se configuró Next.js para activar las compresiones,  
análisis del bundle para detectar JS pesados, optimizaciones de imágenes y eso del modo reactStrictMode para desarrollo, el cual
activa advertencias y verifica errores comunes.

Se instaló next-pwa porque simplifica la configuración y creación de PWAs en proyectos Next.js. Entre otras cosas:
1. Configura automáticamente el service worker (que maneja el cacheo offline)
2. Genera el archivo manifest.json (que permite que la app se instale)
3. Maneja estrategias de cache para assets, páginas, APIs
4. Compatible con SSR y rutas dinámicas de Next.js