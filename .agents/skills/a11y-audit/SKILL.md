---
name: a11y-audit
description: Audit components for accessibility. Use when asked to create or update an accessibility audit or A11y.mdx file for a React component.
---

# Accessibility Audit for React Components

## Workflow

### Step 1: Identify the component

Before doing anything else you must identify what kind of component you're auditing. If the component name is not self-explanatory, you can read its source file(s) or test files to understand what the component does and associate it with a well-known component type.

Once you have identified the component, tell the user a few words about this component and what it does, then move on to step 2.

### Step 2: Find a corresponding ARIA Pattern

Given the type of component to audit, browse the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) and see if there is an existing ARIA Pattern for the component, or guidelines for implementing ARIA roles, states, and properties

Tell the use if you found something and keep this reference for later.

### Step 2: Find RGAA rules

Given the type of component to audit, read the [RGAA 4.1.2 Criteria](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/) and find relevent rules that apply to the component. You can search for h2 tags for the categories and h3 tags for the rules.

Once you have found rules, ask the user if they think these rules are indeed relevant or if they think other rules should be considered. Move on to step 3 only when the user has validated the rules.

### Step 3: Analyze the React component

**Important**: Start skeptical. Assume the React component has accessibility issues until proven otherwise.

Read the component file(s) to understand:

- Component type (interactive, layout, feedback, etc.)
- Props and features
- Current ARIA attributes
- Keyboard handlers (onKeyDown, onKeyUp, etc.)
- Focus management (tabindex, focus traps, etc.)
- React-specific patterns (portals, context, hooks)

Based on the ARIA pattern and RGAA rules that you found in previous steps, identify any accessibility issues or missing features. Be as comprehensive as possible.

### Step 4: Generate and fill `A11y.mdx` file

Create a file `path/to/component/__stories__/A11y.mdx` following the template `a11y-template.mdx`. You can find the "Component Path" in the stories `path/to/component/__stories__/index.stories.tsx`.

Fill the template with your findings from the previous step and following indications in the template file.

### Step 4: Update Storybook configuration

Update the `path/to/component/__stories__/index.stories.tsx` file and complete the `a11yStatus` and `audit` parameters.

```tsx
import type { Meta } from '@storybook/react-vite'
import { Component } from '..'

export default {
  component: Component,
  title: 'UI/Category/Component',
  parameters: {
    a11yStatus: 'compliant' | 'partial' | 'non-compliant', // Match the status from A11y.mdx
    audit: {
      'keyboard-focus': true | false,
      'contrast-visuals': true | false,
      'semantics-screen-reader': true | false,
      'pointer-touch': true | false,
      'specific-patterns': true | false,
    },
  },
} satisfies Meta<typeof Component>
```

**Set `a11yStatus` status based on component status:**

- ✅ Compliant → `a11y: 'compliant'`
- ⚠️ Needs Work → `a11y: 'partial'`
- ❌ Non-compliant → `a11y: 'non-compliant'`

**Set `audit` flags based on Quick Checks:**

- `'keyboard-focus'`: true if Keyboard check is ✅
- `'contrast-visuals'`: true if Contrast check is ✅
- `'semantics-screen-reader'`: true if ARIA and Screen Readers are ✅
- `'pointer-touch'`: true if component supports pointer/touch appropriately
- `'specific-patterns'`: true if component-specific patterns are implemented

## Action Summary & Prioritization

After analyzing a component, provide a short summary with:

### Ticket Template

If issues found, suggest a ticket:

```markdown
**Title**: [A11Y] Fix [Component] - [Priority]

**Description**:

- Status: ⚠️ Needs Work
- RGAA Criteria: ...
- Critical issues: ...
- Dependencies: [list or "none"]
- Estimated effort: [XS/S/M/L/XL]

**Acceptance Criteria**:

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen readers announce component correctly
- [ ] Focus is visible and managed properly
- [ ] ARIA attributes are correct
```

### Related Components to Check

If fixing this component, suggest checking related components:

```markdown
**Check also**:

- [Component A] - Uses same pattern
- [Component B] - Shares keyboard logic
- [Component C] - Similar ARIA requirements
```
