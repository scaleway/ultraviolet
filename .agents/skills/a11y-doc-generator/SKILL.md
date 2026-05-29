---
name: a11y-doc-generator
description: Generate simplified accessibility documentation for React components. Use when asked to create, simplify, or update a11y.md files for React Component Library components.
---

# Accessibility Documentation Generator for React Components

This skill generates simplified accessibility documentation for UI components in React Component Libraries following the project's template.

## What it does

1. **Creates `a11y.md`** - Simplified accessibility audit (following `.a11y/template.md`)
2. **Creates `__tests__/a11y.test.tsx`** - Accessibility test file with automated checks
3. **References RGAA criteria** - Uses `.a11y/rgaa-mapping.md` for accessibility standards mapping

## Workflow

### Step 1: Read the reference documents

Always start by reading:
- `.a11y/template.md` - Follow the current structure (do NOT modify)
- `.a11y/rgaa-mapping.md` - Reference RGAA criteria for your component type
- `.a11y/checklist.md` - Use relevant checklist items for your component category

### Step 2: Analyze the React component (with healthy skepticism)

**Important**: Start skeptical. Assume the React component has accessibility issues until proven otherwise.

**Map to RGAA criteria**: Reference `.a11y/rgaa-mapping.md` to identify which RGAA 4.1.2 criteria apply to your component:
- Image criteria (3.x) - For components with images
- Color criteria (3.3, 10.x) - For all components (contrast, color-only information)
- Script criteria (7.x) - Keyboard accessibility, focus management, timing
- Form criteria (11.x) - For form components
- Navigation criteria (12.x) - For navigation components
- Etc.

Read the component file to understand:

- Component type (interactive, layout, feedback, etc.)
- Props and features
- Current ARIA attributes
- Keyboard handlers (onKeyDown, onKeyUp, etc.)
- Focus management (useRef, focus traps, etc.)
- React-specific patterns (portals, context, hooks)

**Red flags to look for in React components** (default to ⚠️ if any are present):

- ❌ No explicit keyboard event handlers (`onKeyDown`, `onKeyUp`) for interactive components
- ❌ Missing `aria-*` attributes (especially `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-describedby`)
- ❌ No `tabIndex` management for non-interactive elements
- ❌ Focus management relies only on pointer events (`onPointerEnter`, `onPointerLeave`, `onMouseEnter`, etc.)
- ❌ No Escape key handling for dismissible components
- ❌ Portal rendering (ReactDOM.createPortal) without proper focus trap or ARIA relationships
- ❌ Conditional rendering without proper ARIA live regions
- ❌ Custom components that mimic native HTML elements (buttons, links, inputs) without full keyboard support
- ❌ ForwardRef not properly implemented for focus management
- ❌ Context-based state without proper ARIA updates

**Default status guidelines for React Component Libraries**:

- **Interactive components** (Tooltip, Modal, Dropdown, Menu, etc.) → Start with ⚠️ Needs Work
- **Layout primitives** (Stack, Row, Box, etc.) → Can start with ✅ Compliant if no interactive features
- **Form components** (Input, Select, Checkbox, etc.) → Start with ⚠️ Needs Work
- **Feedback components** (Alert, Toast, Notification) → Start with ⚠️ Needs Work
- **Any component using React portals** → Start with ⚠️ Needs Work (focus management, ARIA relationships)
- **Compound components** → Verify proper context-based ARIA coordination

Only mark as ✅ Compliant if you can verify:

1. Full keyboard navigation works (Tab, Enter, Escape, Arrow keys as appropriate)
2. All ARIA attributes are correctly implemented and linked
3. Focus is properly managed (visible, trapped when needed, restored on close)
4. Screen readers can properly announce the component and its state

### Step 3: Generate `a11y.md`

**Default to skepticism**: If in doubt, mark as ⚠️ Needs Work. It's better to over-report potential issues than to miss real accessibility barriers.

**Verify related components exist**: Before listing components in "Related Components", verify they exist in the library by checking:
- `packages/ui/src/components/[ComponentName]/index.tsx`
- Or search for component exports in the codebase

Only list components that actually exist in your component library.

Create a simplified markdown file with:

````markdown
# [Component] - Accessibility

## Summary

**Status**: ✅ Compliant / ⚠️ Needs Work / ❌ Non-compliant  
**Type**: [Component type]

## Quick Checks

- [✅/❌/⚠️] Keyboard: [...]
- [✅/❌/⚠️] ARIA: [...]
- [✅/❌/⚠️] Focus: [...]
- [✅/❌/⚠️] Contrast: [...]
- [✅/❌/⚠️] Screen Readers: [...]

## Required Actions

### Critical

1. [Action]

### Secondary

- [Action]

## Implementation

```tsx
// Code snippet if fixes needed
```
````

## Best Practices

### ✅ Do

```tsx
// Good examples
```

### ❌ Avoid

```tsx
// Bad examples
```

## Tests

See [`__tests__/a11y.test.tsx`](./__tests__/a11y.test.tsx)

### Manual Checklist

- [ ] Keyboard navigation
- [ ] Screen reader tests
- [ ] Contrast

## Resources

- [Links if relevant]
- RGAA criteria from `.a11y/rgaa-mapping.md`

## Related Components

- **Component** - Description (only list components that exist in the library)

````

### Step 4: Generate `a11y.test.tsx`

Create comprehensive tests with the `a11y` tag for filtering.

**Important**: If the component is NOT compliant (status: ⚠️ or ❌), mark failing tests as `it.todo`:

```tsx
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it, expect, vi } from 'vitest'
import { Component } from '..'

describe('Component - A11y', { tags: ['a11y'] }, () => {
  // ARIA role tests
  describe('ARIA roles', () => {
    it.todo('should have role="alert" for danger sentiment', () => {
      // TODO: Implement after component is fixed
    })
  })

  // Keyboard tests
  describe('keyboard accessibility', () => {
    it.todo('should handle Escape key', async () => {
      // TODO: Implement after component is fixed
    })
  })

  // Passing tests (if any)
  it('should have accessible button text', () => {
    // This already works
  })

  // Automated violations - will pass if no violations found
  it.todo('should not have violations', async () => {
    // TODO: Run after component is fixed
  })
})
````

**Rules:**

- ✅ Component compliant → All tests run normally
- ⚠️/❌ Component not compliant → Tests for broken features use `it.todo`
- Always include `{ tags: ['a11y'] }` in the describe block for filtering

## Guidelines

### Keep it simple

- Max 100 lines for `a11y.md`
- Use ✅/❌/⚠️ for quick scanning
- Move detailed test proofs to `a11y.test.tsx`
- Reference the test file, don't duplicate content

### Be actionable

- List specific fixes needed
- Include code snippets for solutions
- Provide clear Do/Don't examples

### Verify before listing

- Check related components exist in `packages/ui/src/components/`
- Don't reference components that don't exist in the library
- If unsure, omit the "Related Components" section

### Follow the template and standards

- Always match `.a11y/template.md` structure
- Map findings to RGAA criteria from `.a11y/rgaa-mapping.md`
- Use `.a11y/checklist.md` for comprehensive testing coverage
- Do NOT modify the reference documents

## Example output for React Component Libraries

For a layout component (Stack, Row, Box):

- Status: ✅ Compliant (if truly no interactive features)
- Minimal checks (all pass)
- Simple best practices
- Basic test coverage

For an interactive component (Tooltip, Button, Modal, Dropdown, Menu):

- Status: ⚠️ Needs Work (DEFAULT - assume issues until proven otherwise)
- Detailed ARIA checks with skepticism
- Keyboard interaction tests (mark as `it.todo` if not implemented)
- Focus management tests (verify, don't assume)
- Screen reader testing checklist
- List specific missing features

For a form component (Input, Select, Checkbox):

- Status: ⚠️ Needs Work (DEFAULT)
- Verify label associations, error states, required field announcements
- Test all keyboard interactions
- Check ARIA live regions for dynamic validation

**Remember**: Users with disabilities depend on this documentation. Being overly optimistic about accessibility creates barriers. Always verify claims with actual tests.

## Files to create

1. `[Component]/a11y.md` - Documentation
2. `[Component]/__tests__/a11y.test.tsx` - Tests (if doesn't exist)

## Reference documents (read-only)

- `.a11y/template.md` - Documentation structure
- `.a11y/rgaa-mapping.md` - RGAA 4.1.2 criteria mapping
- `.a11y/checklist.md` - Accessibility checklists by component type

## Related

- Test utilities: `@utils/test`
- WAI-ARIA patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- React Accessibility: https://www.w3.org/WAI/tutorials/
- WAI-ARIA in React: https://react.dev/reference/react-dom/components/common#aria-attributes
- RGAA 4.1.2: https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/
