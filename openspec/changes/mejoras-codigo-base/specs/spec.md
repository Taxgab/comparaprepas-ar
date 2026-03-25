# Delta Specs: Mejoras Código Base

## Domain: UI/Refactor

### ADDED Requirements

#### Requirement: Component Reutilization

The system SHALL use the existing Header, Hero, HowItWorks, and LegalSection components instead of inline code in page.tsx.

##### Scenario: Header Component Usage

- GIVEN the page.tsx file exists
- WHEN the application renders the home page
- THEN the Header component from `@/components/Header` MUST be used
- AND inline header code SHALL NOT exist in page.tsx

##### Scenario: Hero Component Usage

- GIVEN the Hero.tsx component exists in the components folder
- WHEN the home page renders the hero section
- THEN the Hero component MUST be imported and used
- AND inline hero code SHALL NOT exist in page.tsx

##### Scenario: HowItWorks Component Usage

- GIVEN the HowItWorks.tsx component exists
- WHEN the home page renders the "how it works" section
- THEN the HowItWorks component MUST be imported and used
- AND the section SHALL be removed from inline page.tsx code

##### Scenario: LegalSection Component Usage

- GIVEN the LegalSection.tsx component exists
- WHEN the home page renders the legal/FAQ section
- THEN the LegalSection component MUST be imported and used
- AND inline legal section code SHALL NOT exist in page.tsx

---

## Domain: SEO

### ADDED Requirements

#### Requirement: Dynamic Metadata for Company Pages

The system MUST generate unique metadata for each company detail page based on the company data.

##### Scenario: Company Page Title

- GIVEN a company with id="osde" and name="OSDE"
- WHEN a user visits /company/osde
- THEN the page title MUST be "OSDE - Planes y Precios | ComparaPrepas AR"

##### Scenario: Company Page Description

- GIVEN a company with description="OSDE es una de las prepagas líderes..."
- WHEN search engines crawl /company/osde
- THEN the meta description MUST contain the company description

##### Scenario: Company Page Open Graph

- GIVEN a company detail page
- WHEN the page is shared on social media
- THEN Open Graph tags MUST include the company name and description

##### Scenario: Invalid Company Metadata

- GIVEN an invalid company id "nonexistent"
- WHEN the page attempts to generate metadata
- THEN the title MUST be "Empresa no encontrada | ComparaPrepas AR"

---

## Domain: Testing

### ADDED Requirements

#### Requirement: Testing Infrastructure

The system MUST have Vitest and React Testing Library configured and running.

##### Scenario: Test Command Available

- GIVEN the package.json file
- WHEN running `npm test`
- THEN the command MUST execute Vitest
- AND tests SHOULD run in watch mode during development

##### Scenario: CompanyCard Component Test

- GIVEN the CompanyCard component with a mock company
- WHEN the test renders the component
- THEN it MUST display the company name
- AND it MUST display the formatted price
- AND it MUST display the rating stars

##### Scenario: Format Price Utility Test

- GIVEN the formatPrice utility function
- WHEN called with price=45500
- THEN it MUST return "$45.500,00" (or locale equivalent)

##### Scenario: Navigation Test

- GIVEN the Header component
- WHEN clicking the "Contacto" button
- THEN it SHOULD trigger the expected action

---

## Domain: Accessibility

### ADDED Requirements

#### Requirement: Skip Navigation

The system MUST provide a skip link for keyboard users to bypass navigation.

##### Scenario: Skip Link Presence

- GIVEN the page has loaded
- WHEN the user presses Tab
- THEN a "Saltar al contenido" link MUST appear
- AND pressing Enter on it MUST move focus to the main content

##### Scenario: Skip Link Visibility

- GIVEN the skip link exists
- WHEN it has focus
- THEN it MUST be visible on screen
- AND when focus moves away, it SHOULD be visually hidden but accessible

#### Requirement: ARIA Labels

All interactive elements MUST have accessible names via aria-label or associated labels.

##### Scenario: Mobile Menu Button

- GIVEN the mobile menu button exists
- WHEN using a screen reader
- THEN it MUST announce "Abrir menú de navegación" (or similar descriptive text)

##### Scenario: Navigation Links

- GIVEN the navigation has multiple links
- WHEN using a screen reader
- THEN each link MUST have a descriptive accessible name

##### Scenario: Company Card Links

- GIVEN a CompanyCard component
- WHEN it renders as a Link to a company
- THEN it SHOULD have aria-label="Ver planes de {companyName}"

#### Requirement: Color Contrast

All text MUST meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text).

##### Scenario: Primary Button Contrast

- GIVEN a button with bg-blue-600 text-white
- WHEN checking contrast ratio
- THEN it MUST be at least 4.5:1

##### Scenario: Secondary Text Contrast

- GIVEN text with text-gray-600 on white background
- WHEN checking contrast ratio
- THEN it MUST be at least 4.5:1

#### Requirement: Focus Management

Focus MUST be visible and logical throughout the application.

##### Scenario: Focus Visible

- GIVEN any interactive element
- WHEN it receives keyboard focus
- THEN a visible focus indicator MUST be present
- AND the indicator MUST meet contrast requirements

##### Scenario: Focus Trap in Mobile Menu

- GIVEN the mobile menu is open
- WHEN pressing Tab repeatedly
- THEN focus SHOULD cycle within the menu
- AND focus MUST NOT move to elements behind the menu

### MODIFIED Requirements

#### Requirement: Company Card Accessibility

The CompanyCard component SHALL include proper ARIA attributes for better screen reader experience.

(Previously: Basic card without ARIA attributes)

##### Scenario: Company Card Role

- GIVEN a CompanyCard component
- WHEN rendered
- THEN it MUST have role="article" or similar semantic role
- AND it SHOULD indicate it's a clickable card
