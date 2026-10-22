---
"@ultraviolet/ui": patch
---

`Button`: forward ARIA attributes, `role`, `tabIndex`, `onClick` and the accessible label / loader content to custom elements passed via the `render` prop, matching what the native `<button>` and `<a>` elements receive. The `aria-current` prop now accepts the full ARIA value list (`page`, `step`, …) instead of only booleans.
