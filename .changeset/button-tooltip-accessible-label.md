---
"@ultraviolet/ui": minor
---

`Button`:
- new `tooltipLabel` prop: renders text inside a Tooltip with a `label` relation (tooltip text becomes the accessible name via `aria-labelledby`)
- new `tooltipDescription` prop: renders text inside a Tooltip with a `description` relation (accessible description via `aria-describedby`)
- new `accessibleLabel` prop: renders a `VisuallyHidden` element inside the button to provide a localizable accessible name
- deprecate `tooltip` prop: it now falls back to `tooltipDescription` to avoid a breaking change
- deprecate `aria-label` prop: it now falls back to `accessibleLabel` to avoid a breaking change
