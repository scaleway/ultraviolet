---
"@ultraviolet/themes": patch
"@ultraviolet/ui": patch
---

Deprecate `ThemeProvider`, `darkTheme`, `darkerTheme`, `theme`, and `useTheme` from @ultraviolet/ui. Use the equivalents from @ultraviolet/themes instead.

⚠️⚠️ **Future breaking change** ⚠️⚠️  
The `ThemeProvider` from `@ultraviolet/ui` automatically injects styles from `@ultraviolet/icons`.  
The replacement `ThemeProvider` in `@ultraviolet/themes` does **not** include this side effect.

When these exports are removed in the next major version, you must manually import the icon styles to avoid visual regressions:

```js
import '@ultraviolet/icons/styles'
```