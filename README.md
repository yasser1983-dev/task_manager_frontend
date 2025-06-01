
## Estructura del proyecto task_fronted/
│
├── public/               # Archivos estáticos (favicon, imágenes, etc.)
├── src/                  # Todo el código fuente va aquí
│   ├── app/              # Rutas y páginas (Next.js App Router)
│   │   ├── layout.tsx    # Layout raíz
│   │   ├── page.tsx      # Página principal
│   │   └── login/        # Rutas anidadas (login, dashboard, etc.)
│   │       └── page.tsx
│   │
│   ├── components/       # Componentes reutilizables
│   ├── features/         # Slices de Redux u otras funciones del dominio (por feature)
│   │   ├── auth/
│   │   ├── tasks/
│   │   └── categories/
│   ├── hooks/            # Hooks personalizados
│   ├── services/         # Lógica de llamadas HTTP (fetch/axios)
│   ├── store/            # Redux store u otra gestión global
│   ├── lib/              # Utilidades o funciones auxiliares
│   └── styles/           # Archivos CSS/SCSS globales o por componente
│
├── .env.local
├── next.config.js
└── package.json
