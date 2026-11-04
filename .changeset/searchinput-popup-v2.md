---
"@ultraviolet/ui": patch
---

`SearchInput`: migrate to the new Popup component
- deprecate the `popupPlacement` property (the panel is always aligned at bottom-start and flips when missing space)
- add max-height of 410px and scroll on the panel
