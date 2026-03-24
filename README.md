# ComparaPrepas AR 🏥

Comparador de prepagas de Argentina construido con Next.js 14.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Lucide React** para íconos
- **Mobile-first** design
- **6 empresas** con detalle de planes, contacto y servicios

## 📋 Empresas Incluidas

- PreMedic
- Avalian
- Medifé
- OSDE
- Hominis
- Swiss Medical

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
│   │   ├── page.tsx              # Home: grid de empresas
│   │   └── company/[id]/page.tsx # Detail: empresa + planes
│   ├── components/
│   │   ├── CompanyCard.tsx       # Card para lista de empresas
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   └── LegalSection.tsx
│   └── data/
│       ├── companies.ts          # Data de empresas
│       └── plans.ts             # Data de planes
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 📱 Responsive Design

- **Móvil (< 768px)**: Cards en grid de 1 columna
- **Tablet (768px - 1024px)**: Grid de 2 columnas
- **Desktop (> 1024px)**: Grid de 3 columnas

## 🔧 Personalización

### Agregar más empresas
Editar `src/data/companies.ts` y agregar nuevos objetos al array.

### Agregar más planes
Editar `src/data/plans.ts` y agregar nuevos objetos al array.

### Cambiar colores
Modificar `tailwind.config.ts` en la sección `theme.extend.colors`.

## 📄 Licencia

MIT

---

Desarrollado con ❤️ para Argentina