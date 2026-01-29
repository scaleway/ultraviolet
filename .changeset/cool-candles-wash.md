---
"@ultraviolet/ui": patch
---

`List`: `<><List.Cell /><List.Cell /></>` should be seen as 2 columns instead of 1. This was problematic when column width were defined.
