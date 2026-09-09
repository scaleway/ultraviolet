---
"@ultraviolet/ui": patch
---

`Button`:
- `tooltipLabel` now renders the label in a `VisuallyHidden` element inside the button (providing the accessible name via text content) instead of linking the tooltip with `aria-labelledby`.
- The tooltip shown by `tooltipLabel` is no longer linked to the button.

`Tooltip`:
- new `relation="none"` option: renders the tooltip without linking it to the trigger element (no `aria-labelledby` / `aria-describedby`).
