---
"@ultraviolet/themes": minor
---

`ThemeProvider`: do not hash css variable names.
The name of the CSS variables defined in the ThemeProvider are not hashed anymore. This has a couple of consequences:
- clearer naming
- possibility to use the variables without importing css files (`@ultraviolet/themes/light.css` and other variants)
- reduces FOUC

⚠️⚠️ **Breaking change**: If `@ultraviolet/themes/light.css` (and other variants) is imported, any custom theme defined in the theme provider **will be** overwritten by the .css file (see `examples/next/src/pages/_app.tsx`: to apply the custom *primary text* , `@ultraviolet/themes/light.css` is imported in a layer to reduce its specificity).⚠️⚠️

⚠️⚠️ **This change may break snapshots** since the variable names are not hashed anymore ⚠️⚠️

> This changes only affect `ThemeProvider` from `@ultraviolet/themes`. The one from `@ultraviolet/ui` has not been changed (deprecated).
