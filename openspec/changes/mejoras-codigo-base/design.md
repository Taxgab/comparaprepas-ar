# Design: Mejoras Código Base - Refactor, SEO, Testing y Accesibilidad

## Technical Approach

Implementar cuatro mejoras independientes pero relacionadas:

1. **Refactor**: Extraer secciones inline de `page.tsx` a componentes reutilizables existentes
2. **SEO**: Implementar `generateMetadata` en rutas dinámicas usando datos de compañías
3. **Testing**: Configurar Vitest + React Testing Library + crear tests iniciales
4. **A11y**: Agregar componentes de accesibilidad y atributos ARIA

Cada área puede implementarse de forma incremental sin bloquear las demás.

## Architecture Decisions

### Decision: Use Vitest over Jest

**Choice**: Vitest
**Alternatives considered**: Jest
**Rationale**: 
- Vitest es más rápido (usa esbuild)
- Mejor soporte nativo para ESM (Next.js usa ESM)
- Configuración más simple con TypeScript
- Mejor integración con Vite (aunque Next.js no usa Vite, la API es similar)

### Decision: Keep Existing Component Structure

**Choice**: Usar los componentes Header, Hero, HowItWorks, LegalSection ya existentes
**Alternatives considered**: Crear nuevos componentes o reestructurar
**Rationale**:
- Los componentes ya están implementados y funcionan
- Solo falta integrarlos en page.tsx
- Menor riesgo de introducir bugs

### Decision: Inline Metadata Generation

**Choice**: Generar metadata directamente en cada página usando `generateMetadata`
**Alternatives considered**: Middleware, helper function externa
**Rationale**:
- Next.js App Router recomienda `generateMetadata` para SSG
- Permite acceso a params directamente
- Más simple para este caso de uso

### Decision: Create SkipLink Component

**Choice**: Componente dedicado para skip navigation
**Alternatives considered**: Atributo nativo HTML5, implementación inline
**Rationale**:
- Mejor reusabilidad
- Puede personalizarse (target ID, texto)
- Mejor testing aislado

## Data Flow

### Refactor Flow

```
page.tsx
  ├── imports Header from "@/components/Header"
  ├── imports Hero from "@/components/Hero"
  ├── imports HowItWorks from "@/components/HowItWorks"
  ├── imports LegalSection from "@/components/LegalSection"
  └── imports Footer (nuevo componente)
```

### SEO Metadata Flow

```
company/[id]/page.tsx
  ├── generateMetadata({ params })
  │   ├── getCompanyById(params.id)
  │   └── returns { title, description, openGraph }
  └── default Page component
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Modify | Refactor to use imported components |
| `src/app/company/[id]/page.tsx` | Modify | Add generateMetadata function |
| `src/components/Footer.tsx` | Create | New Footer component (currently inline) |
| `src/components/SkipLink.tsx` | Create | Skip navigation component |
| `src/components/CompanyCard.tsx` | Modify | Add aria-label and ARIA attributes |
| `src/components/Header.tsx` | Modify | Ensure aria-labels present |
| `package.json` | Modify | Add vitest, @testing-library/react, jsdom |
| `vitest.config.ts` | Create | Vitest configuration |
| `src/test/setup.ts` | Create | Test utilities and setup |
| `src/test/CompanyCard.test.tsx` | Create | Tests for CompanyCard |
| `src/test/utils.test.ts` | Create | Tests for formatPrice utility |
| `tailwind.config.ts` | Modify | Add missing primary-600 color |
| `src/app/globals.css` | Modify | Remove or limit global transition |
| `src/app/layout.tsx` | Modify | Add SkipLink and lang attribute |

## Interfaces / Contracts

### SkipLink Component

```typescript
interface SkipLinkProps {
  targetId: string;      // ID del elemento al que saltar
  text?: string;         // Texto del enlace (default: "Saltar al contenido")
  className?: string;    // Clases adicionales
}
```

### generateMetadata

```typescript
// company/[id]/page.tsx
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const company = getCompanyById(params.id);
  
  if (!company) {
    return {
      title: "Empresa no encontrada | ComparaPrepas AR",
    };
  }
  
  return {
    title: `${company.name} - Planes y Precios | ComparaPrepas AR`,
    description: company.description,
  };
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | CompanyCard rendering | RTL: render + screen queries |
| Unit | formatPrice utility | Direct function calls |
| Unit | SkipLink visibility | RTL: focus + visibility checks |
| Integration | Header navigation | RTL: click + navigation |
| Static | TypeScript types | `tsc --noEmit` |
| Static | Linting | `next lint` |

## Migration / Rollout

No migration required. Changes are additive or refactoring existing code.

Rollout phases:
1. Phase 1: Refactor + Footer component (lowest risk)
2. Phase 2: SEO metadata (additive)
3. Phase 3: A11y improvements (low risk)
4. Phase 4: Testing infrastructure (dev-only)

## Open Questions

- [ ] Should we add visual regression tests? (Out of scope for now)
- [ ] Should Footer become a reusable component or stay in page.tsx? (Create as component for reusability)
- [ ] Should we add a11y linting with eslint-plugin-jsx-a11y? (Recommended but can be added later)

## Component Hierarchy

```
Layout (Root)
├── SkipLink (new)
├── Header (existing - now used)
├── main#content (target for SkipLink)
│   ├── Hero (existing - now used)
│   ├── Companies Grid
│   │   └── CompanyCard[] (modified with a11y)
│   ├── HowItWorks (existing - now used)
│   ├── LegalSection (existing - now used)
│   └── CTA Section (keep inline or extract?)
└── Footer (new component)
```

## Color Palette Consistency

Current issues:
- `primary-600` used but not defined
- `blue-600` and `cyan-600` mixed

Fix in `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#0066CC",
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#0066CC",  // Add this
    700: "#004e9f",
    800: "#1e40af",
    900: "#1e3a8a",
  },
}
```
