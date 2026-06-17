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

Given the type of component to audit, browse the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) and see if there is an existing ARIA Pattern for the component, or guidelines for implementing ARIA roles, states, and properties

Tell the user if you found something and keep this reference for later.

### Step 3: Find WCAG rules

**Important**: Take all the time you need for this step, it is crucial that you don't miss any rules. It is better to have too many rules than to miss relevant ones.

Given the type of component to audit, use the WCAP MCP to find relevent rules that apply to the component.

### Step 4: Analyze the React component

**Important**: Start skeptical. Assume the React component has accessibility issues until proven otherwise.

Read the component file(s) to understand:

- Component type (interactive, layout, feedback, etc.)
- Props and features
- Current ARIA attributes
- Keyboard handlers (onKeyDown, onKeyUp, etc.)
- Focus management (tabindex, focus traps, etc.)
- React-specific patterns (portals, context, hooks)

Based on the ARIA pattern and WCAG rules that you found in previous steps, identify any accessibility issues or missing features. Be as comprehensive as possible.

### Step 5: Generate and fill `A11y.mdx` file

Create a file `path/to/component/__stories__/A11y.mdx` following the template `.agents/skills/a11y-audit/resources/audit-template.mdx`. You can find the "Component Path" in the stories `path/to/component/__stories__/index.stories.tsx`.

Fill the `A11y.mdx` file with your findings from the previous step and following indications in the template file. You can find an example of a full `A11y.mdx` file in `.agents/skills/a11y-audit/resources/audit-example.mdx`.

### Step 6: Update Storybook configuration

Update the `path/to/component/__stories__/index.stories.tsx` file and complete or update the `a11yStatus` parameter.

```tsx
import type { Meta } from '@storybook/react-vite'
import { Component } from '..'

export default {
  component: Component,
  title: 'UI/Category/Component',
  parameters: {
    a11yStatus: {
      perceivable: true | false,
      operable: true | false,
      understandable: true | false,
      robust: true | false,
    },
  },
} satisfies Meta<typeof Component>
```

**Set `a11yStatus` flags based on the WCAG rules identified earlier:**

- `perceivable`: false if at least one rule with index 1.x.x fails, otherwise true
- `operable`: false if at least one rule with index 2.x.x fails, otherwise true
- `understandable`: false if at least one rule with index 3.x.x fails, otherwise true
- `robust`: false if at least one rule with index 4.x.x fails, otherwise true

## Action Summary & Prioritization

After analyzing a component, provide a short summary with:

### Ticket Template

If issues found, suggest a ticket:

```markdown
**Title**: [A11Y] Fix [Component]

**Description**:

- Critical issues: ...
- Dependencies: [list or "none"]
- Estimated effort: [XS/S/M/L/XL]

**Acceptance rules**:

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen readers announce component correctly
- [ ] Focus is visible and managed properly
- [ ] ARIA attributes are correct
```
