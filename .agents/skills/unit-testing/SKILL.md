---
name: unit-testing
description: Write Vitest/Testing Library tests the Ultraviolet way — interact with the rendered DOM like a user, following query priority. Use when creating or updating React component tests, or rewriting snapshot-only tests into behavior assertions.
---

# Unit Testing with Testing Library

Tests resemble real user interaction. The more a test looks like a user, the more
confidence it gives.

## Guiding principles

1. Test the rendered **DOM**, not component instances or implementation details.
2. Interact with components the way a user would: by visible text, labels, and roles —
   never through internals, props, or state.
3. Write the smallest test that fails if the logic breaks — a test that goes _red_ on
   the bug.

A component that is hard to query by role or text is usually inaccessible, not a reason
to reach for a lower-priority query.

## Query priority

Choose the highest query that works, in this order:

1. **Accessible to everyone**
   1. `getByRole` — top preference for almost everything. Use with `name` to filter by
      accessible name: `getByRole('button', { name: /submit/i })`. If you can't match
      something by role, the UI is probably inaccessible.
   2. `getByLabelText` — best for form fields; mirrors how users find inputs by their label.
   3. `getByPlaceholderText` — placeholder is not a label, only use if that's all there is.
   4. `getByText` — for non-interactive elements (div, span, p) outside forms.
   5. `getByDisplayValue` — for filled-in form values.
2. **Semantic queries** — HTML5/ARIA selectors, but inconsistent across browsers/screen readers.
   1. `getByAltText` — for `img`, `area`, `input`.
   2. `getByTitle` — title is not read consistently and not visible to sighted users.
3. **Test IDs** — `getByTestId` only when you can't match by role or text and it doesn't
   make sense (e.g. dynamic text). Users can't see them; a testid is a last resort.

### By component type

- Interactive (button, link, tab, switch): `getByRole`
- Feedback/labels (alert, status): `getByRole('alert')`, `getByRole('status')`
- Layout/content: `getByText`
- Icons/avatars: `getByAltText`
- Fallback only: `getByTestId`

## Ultraviolet conventions

- Tests live in `src/components/<Name>/__tests__/*.test.tsx` (or `*.test.ts` for pure utils).
- Use `renderWithTheme` from `@utils/test` to render within the theme provider:
  ```tsx
  import { renderWithTheme } from '@utils/test'
  import { screen } from '@testing-library/react'
  import { userEvent } from '@testing-library/user-event'

  it('submits on click', async () => {
    const onClick = vi.fn()
    renderWithTheme(<Button onClick={onClick}>Submit</Button>)
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })
  ```
- Interact with `userEvent` (click, type, hover, keyboard) — not `fireEvent` where possible.
- Use `screen` (pre-bound to `document.body`); `screen.getByRole` is preferred over
  destructuring from `render`.
- Pure functions: assert behavior with `expect(fn(input)).toEqual(output)`, no rendering needed.

### a11y.test.tsx vs regular tests

The line is thin, but split files by intent:

- **`a11y.test.tsx`** — accessibility-only concerns: axe violations, keyboard
  navigation, focus management, ARIA attributes. Query by role to _trigger_ those
  checks, but assert on a11y outcomes (`expect(axe).toHaveNoViolations()`, focus
  landing, etc.).
- **Regular `*.test.tsx`** — behavior: does the component render and respond.
  `getByRole` here asserts _behavior_; labels/descriptions/roles are matched as a
  side effect of finding the element a user interacts with, not asserted directly.

If a test's real question is "is this accessible?", it's an a11y test. If it's
"does this work?", it's a regular test. Same query tools, different intent.

### Prefer semantic matchers over attribute checks

`toHaveAttribute` tests the implementation (an attribute on an element); jest-dom's
semantic matchers test the **behavior** a user perceives. Reach for them first —
if a matcher exists for what you're asserting, use it instead of checking the
attribute that happens to produce it:

- `expect(radio).toHaveAccessibleName('Agree')` — over `toHaveAttribute('aria-label', ...)`
- `expect(radio).toHaveAccessibleDescription('Invalid value')` — over checking
  `aria-describedby`/`title` wiring
- `expect(button).toBeDisabled()` — over `toHaveAttribute('disabled')`
- `expect(radio).toBeChecked()` — over `toHaveAttribute('checked')` or poking `.checked`
- `expect(toast).toBeVisible()` — over `toHaveAttribute('aria-hidden', 'false')`

These compute their result from the whole source chain (label, aria-label,
aria-labelledby, title, form state, etc.), so they pass when the wiring works and
fail when it breaks — even if the break is in a different attribute than the one
you'd have checked.

## Snapshot policy

A snapshot only locks the initial DOM — it passes until someone clicks "update
snapshot", so it never catches a regression. Use one to sanity-check the default render,
then prove every behavior (state, props, interaction) with assertions.

- **Good:** one `asFragment().toMatchSnapshot()` for the default render + `userEvent` /
  `screen.getByRole` assertions for every behavior.
- **Bad:** a loop of variants each only snapshotting `render(<Button variant={v} />)`.

`shouldMatchSnapshot` from `@utils/test` locks markup, not behavior, and is **deprecated**.
It is acceptable only as an initial-DOM lock; otherwise assert what the variant changes.

### Rewriting a snapshot-only test

1. Keep **one** snapshot of the default render to lock the initial DOM.
2. For each prop/variant/state, replace the snapshot with assertions on what the user
   sees and can do: `getByRole('button', { name: /submit/i })`, `expect(el).toHaveAttribute(...)`,
   `await userEvent.click(...)` then `expect(onClick).toHaveBeenCalled()`, etc.
3. Delete redundant variant snapshots — assert the behavior those variants enable instead.
