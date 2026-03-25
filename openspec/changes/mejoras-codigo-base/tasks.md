# Tasks: Mejoras Código Base

## Phase 1: Infrastructure Setup

- [x] 1.1 Install testing dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`
- [x] 1.2 Create `vitest.config.ts` with Next.js and React support
- [x] 1.3 Update `package.json` scripts to add `"test": "vitest"` and `"test:ui": "vitest --ui"`
- [x] 1.4 Create `src/test/setup.ts` with testing utilities
- [x] 1.5 Fix `tailwind.config.ts` - add missing `primary-600` color definition

## Phase 2: Component Extraction (Refactor)

- [x] 2.1 Create `src/components/Footer.tsx` by extracting footer section from page.tsx
- [x] 2.2 Modify `src/app/page.tsx`: Replace inline header with `<Header />` component import
- [x] 2.3 Modify `src/app/page.tsx`: Replace inline hero with `<Hero />` component import
- [x] 2.4 Modify `src/app/page.tsx`: Add `<HowItWorks />` component after companies grid
- [x] 2.5 Modify `src/app/page.tsx`: Add `<LegalSection />` component before footer
- [x] 2.6 Modify `src/app/page.tsx`: Replace inline footer with `<Footer />` component
- [x] 2.7 Verify page.tsx builds without errors: `npm run build`

## Phase 3: SEO Implementation

- [x] 3.1 Modify `src/app/company/[id]/page.tsx`: Add import for `Metadata` from 'next'
- [x] 3.2 Modify `src/app/company/[id]/page.tsx`: Create `generateMetadata` async function
- [x] 3.3 Implement metadata generation with company name and description
- [x] 3.4 Handle case when company not found (return default metadata)
- [x] 3.5 Test SEO by visiting `/company/osde` and checking page title in browser

## Phase 4: Accessibility Improvements

- [x] 4.1 Create `src/components/SkipLink.tsx` with props for targetId and text
- [x] 4.2 Modify `src/app/layout.tsx`: Add `<SkipLink targetId="content" />` before Header
- [x] 4.3 Modify `src/app/layout.tsx`: Add `id="content"` to main element
- [x] 4.4 Modify `src/components/Header.tsx`: Add aria-label to mobile menu button
- [x] 4.5 Modify `src/components/CompanyCard.tsx`: Add aria-label to Link
- [x] 4.6 Modify `src/components/CompanyCard.tsx`: Add role="article" to card container
- [x] 4.7 Modify `src/app/globals.css`: Remove global transition or limit to specific properties
- [x] 4.8 Verify a11y with manual keyboard navigation test (Tab key)

## Phase 5: Testing Implementation

- [x] 5.1 Create `src/test/CompanyCard.test.tsx` with test for company name display
- [x] 5.2 Create `src/test/CompanyCard.test.tsx` with test for price formatting
- [x] 5.3 Create `src/test/CompanyCard.test.tsx` with test for rating stars rendering
- [x] 5.4 Create `src/test/utils.test.ts` with test for formatPrice function (skipped - no utils file)
- [x] 5.5 Create `src/test/SkipLink.test.tsx` with test for skip link visibility on focus
- [x] 5.6 Run all tests: `npm test` - all should pass

## Phase 6: Verification & Cleanup

- [x] 6.1 Run `npm run build` - verify no errors or warnings
- [x] 6.2 Run `npm run lint` - verify no linting errors
- [x] 6.3 Run `npm test` - verify all tests pass
- [x] 6.4 Manual test: Navigate to home page, verify all sections render
- [x] 6.5 Manual test: Navigate to company detail page, verify metadata updates
- [x] 6.6 Manual test: Tab through page, verify skip link and focus management work
- [x] 6.7 Check console for any warnings or errors
- [x] 6.8 Commit changes with message: "feat: implement refactor, SEO, testing, and a11y improvements"

## Optional/Future Tasks (Phase 7)

- [ ] 7.1 Install and configure `eslint-plugin-jsx-a11y` for automated a11y linting
- [ ] 7.2 Add structured data (JSON-LD) for companies
- [ ] 7.3 Create `sitemap.ts` for SEO
- [ ] 7.4 Add axe-core automated accessibility testing in CI
