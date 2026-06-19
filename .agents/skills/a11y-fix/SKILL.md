---
name: a11y-fix
description: Fix accessibility issues documented in a component's A11y.mdx audit file by editing the component source, then refresh the audit artifacts. Use when the user wants to resolve accessibility issues found by the a11y-audit skill, or mentions fixing a11y/ARIA/keyboard navigation/WCAG issues in a component.
---

# Accessibility Fix

Resolve the accessibility issues documented in a component's `A11y.mdx` audit file by editing the component source, then refresh the audit artifacts so they reflect the new state.

## Workflow

### Step 1: Read the audit

Locate `packages/ui/src/components/<Component>/__stories__/A11y.mdx` (or the path given by the user). If it does not exist, stop and tell the user to run the **a11y-audit** skill first.

Extract from it:

- The **Accessibility issues** section, grouped by Critical / High / Medium / Low
- The **Rules** section (enforced by the component vs. to apply when using)
- The **ARIA Pattern** link, if any

### Step 2: Check dependencies

Read the **Dependencies** section. If it lists other components that must be fixed first, present them to the user and ask whether to fix those before this one. If the user declines or there are none, continue.

### Step 3: Read the component

Read the component source to understand the current implementation and conventions:

- `index.tsx` — component logic, ARIA attributes, keyboard handlers
- `type.ts` — props
- `styles.css.ts` — vanilla-extract styles (focus indicators, visibility)
- Any hooks used by the component

Follow existing conventions (vanilla-extract for styles, functional components, existing ARIA patterns in neighbour components).

### Step 4: Plan and confirm

List every issue from the audit, ordered Critical → High → Medium → Low. For each, state the intended fix and the file(s) affected. Present the plan to the user and confirm before editing.

For common fix patterns and code snippets, see [REFERENCE.md](REFERENCE.md).

### Step 5: Generate a11y test suite (TDD)

Before implementing any fix, write an accessibility test suite that documents the expected **post-fix** behaviour. Tests will initially fail (confirming the issues exist) and pass once the fix is applied.

Create `packages/ui/src/components/<Component>/__tests__/a11y.test.tsx` following the template in [REFERENCE.md](REFERENCE.md#a11y-test-template):

- One `describe('<component> - A11y', { tags: ['a11y'] }, ...)` block.
- For issues detectable by axe (missing role, contrast, labels, ARIA attributes), render the relevant variant and call `await expectNoViolations(container)`.
- For issues axe cannot catch (focus management, keyboard navigation), use React Testing Library queries and `@testing-library/user-event` to assert the desired behaviour (e.g. `expect(trigger).toHaveFocus()` after dismiss, `expect(menu).toBeVisible()` after ArrowDown).
- When color contrast is relevant, iterate themes with `it.for([...consoleThemesMap.entries()])('should not have violations with (theme: %s)', ...)`.
- Only cover rules **Enforced by the component**. Skip **To apply when using the component** rules — those belong in consumer code.

Run the suite with `pnpm test:unit -- <component-path>` and confirm the expected tests fail. Do not proceed to the fix until the suite accurately documents the issues.

### Step 6: Apply fixes

Implement fixes in criticality order. Prefer the smallest change that satisfies the WCAG rule referenced in the audit. Do not change the public API unless strictly necessary; if a prop must change or be added, flag it to the user first.

### Step 7: Verify

Run from the repo root:

- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Component tests: `pnpm test:unit -- <component-path>` (e.g. `packages/ui/src/components/Alert`)

The a11y test suite generated in Step 5 should now pass. Fix any failures you introduced. If a pre-existing test needs updating to reflect the a11y fix, explain why to the user before updating it.

### Step 8: Update audit artifacts

1. **`A11y.mdx`** — for each resolved issue, mark it ✅ and move the detail under a **Resolved** subsection (keep the original note for traceability). Update the **Summary** lines (✅/⚠️/❌) to reflect the new state.
2. **`index.stories.tsx`** — recompute the `a11yStatus` parameter:
   - `perceivable`: `false` if any 1.x.x rule still fails, else `true`
   - `operable`: `false` if any 2.x.x rule still fails, else `true`
   - `understandable`: `false` if any 3.x.x rule still fails, else `true`
   - `robust`: `false` if any 4.x.x rule still fails, else `true`

### Step 9: Manual review

Summarize which fixes were applied, then prompt the user to manually verify with a keyboard (Tab / Enter / Space / Escape) and, if possible, a screen reader.
