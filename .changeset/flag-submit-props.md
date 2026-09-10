---
"@ultraviolet/form": patch
"@ultraviolet/icons": patch
---

`Submit` now spreads all `Button` props, adding `accessibleLabel`, `tooltipLabel` and `tooltipDescription`.

`Flag`: `accessibleLabel` is now a `string` (the flag's accessible name) instead of a boolean, and `className`/`aria-hidden` are now accepted via `SVGProps`.
