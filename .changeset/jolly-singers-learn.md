---
"@ultraviolet/icons": minor
---

All components (`Icon`, `ProductIcon`, `CategoryIcon`, `Flag` and `Logo`):
-  Remove default `title` ⚠️⚠️ **This change might break some tests** ⚠️⚠️
-  New prop `accessibleLabel`;
- `aria-hidden = true` by default;
- Informative icons: when an icon has an `accessibleLabel` (or `aria-label`) set, `aria-hidden` switches to `false` and the svg has `role="img"`;
- `Icon`: deprecate `aria-label` prop. Use `accessibleLabel` instead.
