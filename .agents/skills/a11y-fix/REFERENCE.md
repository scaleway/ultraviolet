# Common Accessibility Fix Patterns

Reference patterns for the most frequent issues found by the a11y-audit skill. Always cross-check the fix against the ARIA Pattern and WCAG rule linked in the component's `A11y.mdx`.

## 1. Missing role

Add the semantic role the ARIA pattern requires, on the element that owns the behaviour.

```tsx
// Alert: announce dynamic insertion
<div role="alert" ...>

// Dialog / Modal
<div role="dialog" aria-modal="true" aria-labelledby={titleId} ...>

// Status / live region (non-urgent)
<div role="status" ...>
```

## 2. Focus management on dismiss / close

When an element is removed (alert dismissed, dialog closed, popover hidden), move focus deliberately — usually back to the trigger that opened it.

```tsx
const triggerRef = useRef<HTMLButtonElement>(null)

const handleClose = () => {
  setOpen(false)
  // restore focus to the trigger
  triggerRef.current?.focus()
}
```

If there is no logical trigger, move focus to a sensible parent (e.g. the main content region) rather than leaving it to fall to `document.body`.

## 3. Labelling

An interactive element needs an accessible name. Pick one, in order of preference:

1. Visible text content (best)
2. `aria-labelledby` pointing to the id of visible text
3. visually hidden text content

Try to avoid `aria-label` because it often gets overlooked in automatic browser translation and screen reader support is not as good as visually hidden content.

```tsx
<Button onClick={onClose}>
  <span class="sr-only">close</span>
  <CloseIcon>
</Button>

<div role="dialog" aria-labelledby={titleId}>
  <h2 id={titleId}>Settings</h2>
</div>
```

Use `aria-describedby` to associate helper / error text with an input.

## 4. Tabindex management

- Native controls (`button`, `a`, `input`) are already focusable — do **not** add `tabIndex`.
- Custom interactive containers need `tabIndex={0}` (or `{-1}` when focus should only be set programmatically via `.focus()`).
- Roving `tabIndex` for composite widgets (Menu, Tabs, Listbox): only the active child is `0`, siblings are `-1`.

## 5. Announcing dynamic content

Use `aria-live` regions for content that updates after load.

- `role="alert"` (implicit `aria-live="assertive"`) — urgent errors / alerts
- `role="status"` (implicit `aria-live="polite"`) — non-urgent status updates
- `aria-live="polite"` on a container for progressive updates (e.g. search result counts)

Avoid `aria-live="assertive"` unless the user must be interrupted.

## 6. Hidden content

- `aria-hidden="true"` on decorative / duplicated content (e.g. an icon-only button that already has `aria-label`).
- `inert` on content outside a Dialog/Drawer while it is open (prevents focus from escaping and hides it from the AT).
- Visually hide text that is only for screen readers with the visually-hidden utility (don't use `display: none`, which removes it from the a11y tree).

## 7. Disabled vs aria-disabled

- A native `<button disabled>` is removed from the a11y tree and not focusable.
- If the user must still perceive the control (e.g. to show a tooltip explaining why it's disabled), keep it focusable with `aria-disabled="true"` and prevent the action in the handler instead.

## a11y test template

Tests live in `packages/ui/src/components/<Component>/__tests__/a11y.test.tsx`. Use the `a11y` tag so the suite can be filtered.

### Axe-detectable issues

```tsx
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { Component } from '..'

describe('component - A11y', { tags: ['a11y'] }, () => {
  it('should not have violations with default props', async () => {
    const { container } = renderWithTheme(<Component>label</Component>)
    await expectNoViolations(container)
  })
})
```

### Theme-dependent contrast

When contrast may vary across themes, iterate with `it.for`:

```tsx
import { consoleThemesMap } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { Component } from '..'

describe('component - A11y', { tags: ['a11y'] }, () => {
  it.for([...consoleThemesMap.entries()])('should not have violations with (theme: %s)', async ([, currentTheme]) => {
    const { container } = renderWithTheme(<Component>label</Component>, currentTheme)
    await expectNoViolations(container)
  })
})
```

### Behaviour axe cannot catch (focus, keyboard)

Use React Testing Library and `@testing-library/user-event` for issues like focus management or keyboard navigation:

```tsx
import { renderWithTheme } from '@utils/test'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Component } from '..'

describe('component - A11y', { tags: ['a11y'] }, () => {
  it('restores focus to the trigger after dismiss', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderWithTheme(<Component />)

    const trigger = getByRole('button')
    await user.click(trigger)
    await user.click(getByRole('button', { name: /close/i }))

    expect(trigger).toHaveFocus()
  })
})
```
