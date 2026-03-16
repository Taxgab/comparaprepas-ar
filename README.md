# ComparaPrepas AR 🏥

Comparador de prepagas de Argentina construido con Next.js 14.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Lucide React** para íconos
- **Mobile-first** design (cards en móvil, tabla en desktop)
- **Filtros en tiempo real** con useState
- **12 planes** de 6 empresas argentinas

## 📋 Empresas Incluidas

- PreMedic (2 planes)
- Avalian (2 planes)
- Medifé (2 planes)
- OSDE (2 planes)
- Hominis (2 planes)
- Swiss Medical (2 planes)

## 🛠️ Instalación

```bash
# Navegar al directorio
cd comparaprepas-ar

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## 📁 Estructura del Proyecto

```
comparaprepas-ar/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Filters.tsx
│   │   ├── PlansTable.tsx
│   │   ├── PlansCards.tsx
│   │   ├── PlansSection.tsx
│   │   ├── HowItWorks.tsx
│   │   └── LegalSection.tsx
│   └── data/
│       └── plans.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Componentes

### Header
Navegación sticky con menú responsive para móvil.

### Hero
Sección principal con búsqueda y propuesta de valor.

### Filters
Filtros sticky en tiempo real:
- Empresas (checkbox múltiple)
- Cobertura (Básica, Intermedia, Completa, Premium)
- Modalidad (Ambulatorio, Con internación, HMO, Prepaga)
- Precio (slider de rango)

### PlansSection
Contenedor principal que alterna entre:
- **Tabla** (desktop): Vista comparativa completa
- **Cards** (móvil): Vista individual por plan

### HowItWorks
4 pasos del proceso con íconos.

### LegalSection
Acordeón con:
- Términos y Condiciones
- Política de Privacidad
- Descargo de Responsabilidad
- Contacto

## 📱 Responsive Design

- **Móvil (< 768px)**: Cards individuales, menú hamburguesa
- **Tablet (768px - 1024px)**: 2 columnas de cards
- **Desktop (> 1024px)**: Tabla completa, 3 columnas de cards

## 🔧 Personalización

### Agregar más planes
Editar `src/data/plans.ts` y agregar nuevos objetos al array `plans`.

### Cambiar colores
Modificar `tailwind.config.ts` en la sección `theme.extend.colors`.

### Modificar empresas
Actualizar el array `companies` en `src/data/plans.ts`.

## 📄 Licencia

MIT

---

Desarrollado con ❤️ para Argentina
