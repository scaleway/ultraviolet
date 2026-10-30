---
"@ultraviolet/ui": minor
---

`SelectInput`: fix accessibility. No breaking change in usage, but a few changes might break tests and deprecated behavior: 
- hard-coded ids replaced by auto-generated one in the `listbox` element
- hard coded ids replaces by `data-type` in other places (`id="items"` => `data-type="items"`) to avoid duplicate ids
- deprecate `aria-label`, use `accessibleLabel` instead