---
"@ultraviolet/ui": patch
---

Allow DND kit to work with `List` and `Button` : 
- `List.Row` now supports "style" and "data-dragging" props ;
- For Security group we don't display header but the List component add to much spaces ;
- List.Row do not allow data-dragging prop
- `Button` can have props "aria-describedby", "aria-disabled", "aria-pressed", "aria-roledescription", "onPointerDown" and "onKeyDown" to work with DND kit
