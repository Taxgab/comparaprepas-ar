# SPEC - Rediseño Frontend ComparaPrepas AR

## 1. Project Overview

- **Nombre**: ComparaPrepas AR
- **Tipo**: Webapp - Comparador de prepagas de salud en Argentina
- **Core functionality**: Mostrar y comparar planes de prepagas de salud (medicinas, empresas, precios)
- **Target users**: Argentinos buscando seguro de salud privado

## 2. UI/UX Specification

### Layout Structure
- **Header**: Logo + navigation (fijo arriba)
- **Hero**: Llamada a acción principal con stats
- **Grid de empresas**: Cards de prepagas
- **Footer**: Links legales y copyright

### Visual Design
- **Estilo**: Moderno, limpio, confianza
- **Paleta**:
  - Primary: `#0066CC` (azul profesional)
  - Secondary: `#00A3E0` (cyan)
  - Background: `#F8FAFC` (gris muy claro)
  - Cards: `#FFFFFF`
  - Text: `#1E293B` (slate-900)
- **Tipografía**: Sans-serif moderna (Inter o similar)
- **Spacing**: 8px grid system
- **Efectos**: Sombras suaves, border-radius 8-12px

### Components
- **CompanyCard**: Logo, nombre, precio destacado, botón "Ver planes"
- **Hero**: Título, subtítulo, stats (empresas, planes, cobertura)
- **Header**: Logo, nav items

## 3. Tech Stack Actual
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

## 4. Requerimientos para Stitch
- Generar landing page con el estilo definido
- Mantener funcionalidad de mostrar empresas de prepagas
- Responsive design (mobile, tablet, desktop)
- Exportar como componentes React/Tailwind

## 5. Deliverables
- Diseño en Stitch (proyecto nuevo)
- Código generado (HTML/CSS o componentes React)
- Implementación en el proyecto actual

## 6. Generated Design (Stitch - 2026-03-24)

El diseño generado por Stitch fue guardado en `/stitch-landing-page.html` como referencia.
Contiene:
- Header con logo y navegación
- Hero con stats (15+, 50+, 100%)
- Grid de 6 CompanyCards con precios
- CTA Section "Hablar con un experto"
- Footer completo
- Paleta: Primary #004e9f, Primary container #0066cc
- Fuentes: Manrope (headlines), Inter (body)
