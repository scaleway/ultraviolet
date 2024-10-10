---
"@ultraviolet/ui": patch
---

`<SelectInputV2 />`:
- Hide search when less than 6 items (even when `searchable = true`)
- Clickable `footer` to close the dropdown
- `clearable = false` by default now
- Dropdown will close when clicking outside when it is inside a modal