---
"@ultraviolet/ui": patch
---

Fix Label accessibility: make the required asterisk decorative (`aria-hidden`) instead of a dropped `aria-label`, and only apply the pointer cursor when rendering a real `<label>`.
