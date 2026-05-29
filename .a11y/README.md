# Accessibility (A11Y) Initiative

## Overview

This initiative aims to achieve **WCAG 2.1 AA** compliance and **RGAA 4.1.2** compliance for all UI components in the Ultraviolet design system, following the accessibility standards.

## Goals

1. Audit all UI components for accessibility issues
2. Implement necessary fixes to meet WCAG 2.1 AA standards
3. Document accessibility features for each component
4. Establish testing procedures with screen readers
5. Create reusable accessibility patterns

## Standards & Guidelines

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **RGAA 4.1.2** - General Repository for Accessibility Improvement (French standard)
- **WAI-ARIA 1.2** - Accessible Rich Internet Applications

## Priority Components

### Phase 1: Critical Components

1. **Popup** - Focus management, keyboard navigation
2. **Tooltip** - Screen reader announcements, timing
3. **Modal** - Focus trap, escape key, role dialog
4. **Dialog** - Similar to Modal, proper ARIA
4. **Drawer** - Similar to Modal
5. **Button** - Foundational component, keyboard support

### Phase 2: High-Impact Components

- Input components (Input, Select, Checkbox, Radio)
- Navigation components (Tabs, Breadcrumbs, Menu)
- Feedback components (Alert, Notification, Badge)

### Phase 3: Remaining Components

- All other UI components

## Testing Tools

### Automated Testing

- axe-core
- Lighthouse Accessibility Audit
- eslint-plugin-jsx-a11y

### Manual Testing

- Keyboard-only navigation
- Screen readers (NVDA, JAWS, VoiceOver, Narrator)
- Color contrast analyzers
- Browser accessibility inspectors

## Documentation Structure

- `template.md` - Component audit template
- `checklist.md` - General accessibility checklist
- `rgaa-mapping.md` - RGAA criteria reference
- `reports/` - Individual component audit reports

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [RGAA 4.1.2 Criteria](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)
