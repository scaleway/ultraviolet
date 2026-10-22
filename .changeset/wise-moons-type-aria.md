---
'@ultraviolet/ui': minor
'@ultraviolet/form': patch
'@ultraviolet/icons': patch
---

Type all `aria-*` props with React's own HTML attribute types (`ButtonHTMLAttributes`, `InputHTMLAttributes`, `AnchorHTMLAttributes`, …) instead of hand-written `string`/`boolean` approximations. `Button` now also forwards its ARIA props to the `render` prop. `DateInput`: the `aria-describedBy` prop was silently dropped at runtime; it is replaced by `aria-describedby`, which is correctly forwarded to the input.
