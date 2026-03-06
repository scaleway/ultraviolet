---
"@ultraviolet/ui": patch
---
**⚠️⚠️ BREAKING CHANGE ⚠️⚠️**

`Breadcrumbs`: move onClick and onKeyDown handlers to `<a>`/`<button>` instead of `<li>` wrapper. This impacts the props type : it uses `HTMLElement` instead of `HTMLLiElement`
