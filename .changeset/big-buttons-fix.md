---
"@ultraviolet/ui": patch
---

`SelectInput`: fix bugs on the "select all" behavior:
- the checkbox did not toggle when the `value` property is controlled
- `onChange` was called with the value of disabled options, even though they stayed unchecked
