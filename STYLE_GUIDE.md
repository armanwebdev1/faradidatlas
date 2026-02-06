# Faradid Atlas Style Guide

## Design Principles
- Premium, restrained, and legible
- Consistent spacing and type rhythm across all pages
- Minimal palette with a warm gold accent
- Motion that supports hierarchy, never distracts

## Design Tokens
All tokens live in `app/globals.css` under `:root`.

### Colors
- Primary ink: `--primary` / `--foreground`
- Backgrounds: `--background`, `--background-alt`, `--surface`, `--surface-muted`
- Accent gold: `--accent` / `--accent-warm-gold`
- Accent copper: `--accent-warm-copper`
- Accent platinum: `--accent-platinum`
- Border: `--border`

### Typography
- Body: `--font-body` (LTR: `--font-sans`, RTL: `--font-shabnam`)
- Display/Headings: `--font-hero` (LTR: `--font-serif`, RTL: `--font-estedad`)
- Labels: `--font-label` (LTR: `--font-satoshi`, RTL: `--font-shabnam`)

Type scale (CSS variables):
- `--text-hero` for page titles
- `--text-display` for section titles
- `--text-title` for sub-sections
- `--text-subtitle` for card titles
- `--text-body-lg`, `--text-body`, `--text-body-sm`
- `--text-caption`, `--text-eyebrow`

### Spacing
- Base scale: `--space-1` to `--space-24` (4px increments)
- Section spacing: `--section-y`, `--section-y-compact`, `--section-y-hero`
- Horizontal gutters: `--gutter`

### Radius
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Pills: `--radius-pill`

### Shadows
- `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Motion
- Durations: `--duration-fast`, `--duration-base`, `--duration-slow`
- Easings: `--ease-standard`, `--ease-emphasized`

## Layout Standards
Use containers for consistent width and gutters:
- `container-compact`, `container-wide`, `container-full`

Section spacing:
- `section` for most sections
- `section-compact` for dense content
- `section-hero` for hero blocks

Stacks and gaps:
- `stack-xs`, `stack-sm`, `stack-md`, `stack-lg`

## Typography Utilities
- `text-responsive-hero` for main hero titles
- `text-responsive-title` for section headers
- `text-responsive-section` for sub-section headers
- `text-responsive-subheading` for card headers
- `text-responsive-body` for body copy
- `text-responsive-caption` for small helper text
- `eyebrow` for uppercase label text

## Buttons
Use the shared button system:
- Base: `btn`
- Variants: `btn-primary`, `btn-outline`, `btn-secondary`, `btn-ghost`, `btn-link`, `btn-destructive`
- Sizes: `btn-sm`, `btn-md`, `btn-lg`, `btn-icon`, `btn-icon-sm`, `btn-icon-lg`

Prefer the `Button` component for consistent behavior.

## Forms
Use standardized form classes:
- `form-card` for form containers
- `form-label` for labels
- `form-input`, `form-select`, `form-textarea` for fields
- `form-hint`, `form-error` for helper text

## Cards
Use the shared card system:
- `card` for structure
- `card-hover` for interactive elevation

## Motion and Interaction
- Use `animate-fade-in-up` for primary reveals
- Prefer `transition` classes already built into `btn` and `card-hover`
- Keep hover states subtle: translate up 1–2px, soft shadow changes

## RTL/LTR
All pages must set `dir` on the page wrapper.
Fonts and alignment switch automatically via `[dir]` rules in `app/globals.css`.

## Implementation Plan
1. Normalize tokens and base styles in `app/globals.css`.
2. Ensure fonts are injected at the `html` level in `app/layout.tsx`.
3. Replace one-off paddings with `section` and container utilities.
4. Replace ad-hoc buttons with `btn` classes or `Button` component.
5. Replace ad-hoc form styles with `form-*` classes.
6. Remove hard-coded hex colors in components and use token classes.
7. Audit remaining components for inline typography overrides.
8. Run a visual pass across all pages and update any outliers.

## Usage Checklist
- Use `section` + `container-*` for layout consistency.
- Use `text-responsive-*` classes for headings and body.
- Use token classes (`text-accent`, `bg-surface`, `border-border`) instead of hex.
- Use `btn` and `form-*` classes for all interactive elements.
