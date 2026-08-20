---
"@ultraviolet/ui": minor
---

`Tooltip`: rebuilt on Floating UI instead of the `Popup`, fixing multiple positioning and accessibility bugs.
  - The tooltip can be used as a label or a description
  - The tooltip can be rendered next to its reference element or in a React Portal
  - The trigger wrapper `tabIndex` defaults to `-1` when the children is already a focusable element, removing the double tab stop
  - The redundant `aria-controls` is no longer set, and `role` is hard-pinned to `tooltip`
  - `aria-describedby` is now forwarded to render-function children and is only set while the tooltip is open
  - The tooltip is now hoverable
  - Multiple props were added or deprecated, staying backward-compatible
