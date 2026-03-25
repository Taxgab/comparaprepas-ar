# Proposal: Mejoras Código Base - Refactor, SEO, Testing y Accesibilidad

## Intent

Resolver la deuda técnica identificada en el análisis del código:
1. Eliminar código duplicado y usar componentes existentes
2. Implementar metadata dinámica para SEO
3. Agregar infraestructura de testing
4. Mejorar accesibilidad (a11y)

## Scope

### In Scope
- **A**: Refactorizar page.tsx para usar Header, Hero, HowItWorks, LegalSection components
- **B**: Agregar metadata dinámica en company/[id]/page.tsx
- **C**: Instalar y configurar Vitest + React Testing Library + crear tests básicos
- **D**: Agregar aria-labels, skip links, verificar contrastes, mejorar navegación

### Out of Scope
- Migración a base de datos real
- Implementación de filtros de búsqueda
- Autenticación de usuarios
- Tests E2E (Playwright)

## Approach

1. **Refactor**: Extraer secciones inline de page.tsx a componentes reutilizables
2. **SEO**: Implementar generateMetadata con datos de compañías
3. **Testing**: Instalar Vitest + RTL, crear tests para CompanyCard y utilidades
4. **A11y**: Agregar atributos ARIA, crear SkipLink component, verificar contrastes

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Modified | Extraer código inline a componentes |
| `src/app/company/[id]/page.tsx` | Modified | Agregar generateMetadata |
| `src/components/` | Modified | Agregar aria-labels y props de a11y |
| `package.json` | Modified | Agregar dependencias de testing |
| `vitest.config.ts` | New | Configuración de Vitest |
| `src/test/` | New | Tests de componentes |
| `src/components/SkipLink.tsx` | New | Componente de skip navigation |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Breaking changes en UI | Low | Componentes mantienen mismo markup, solo se mueven |
| Tests flaky | Low | Usar buenas prácticas de RTL, evitar timers |
| Performance degradation | Low | No agregar bundles pesados, solo metadata y atributos |

## Rollback Plan

1. Revertir commit: `git revert HEAD`
2. Si hay problemas con metadata: remover función generateMetadata
3. Si tests fallan: deshabilitar en CI temporalmente

## Dependencies

- Node.js >= 18
- No cambios en infraestructura externa

## Success Criteria

- [ ] Header component se usa en page.tsx (no duplicado)
- [ ] Cada página de empresa tiene título único en SEO
- [ ] Tests pasan: `npm test` ejecuta sin errores
- [ ] No hay errores de a11y con axe-core
- [ ] Build exitoso: `npm run build` sin warnings
