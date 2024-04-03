---
"@ultraviolet/ui": patch
---

- Add `tabIndex` on `<Tooltip />` component to be able to disable tab when the children is already tabbable
- Fix `<Expandable />` to add `visibility: hidden` when the component is collapsed to avoid tabulation on hidden elements
