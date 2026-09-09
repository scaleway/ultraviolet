---
"@ultraviolet/ui": patch
---

`Tooltip`:
- `relation="label"` tooltips are now rendered inline in the DOM and visually hidden until hover/focus, then moved to the portal target when opened (instead of always being portaled).
