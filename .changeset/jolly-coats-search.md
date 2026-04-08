---
"@ultraviolet/ui": patch
---

`Drawer`: fix `hideOnClickOutside` behavior: set to `true` by default (similar to `Modal`) for default drawers and to `false` for *push* drawers. Small fix to allow interactivity outside of *push* drawers (previously, only content of the push drawer was interactive).