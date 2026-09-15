---
"@ultraviolet/themes": minor
---

`ThemeProvider`: do not hash css variable names.
The name of the CSS variables defined in the ThemeProvider are not hashed anymore. This has a couple of consequences:
- clearer naming
- possibility to use the variables without importing css files (`@ultraviolet/themes/light.css` and other variants)
- reduces FOUC

The function has been updated to only import css variable that are not already declared in order to avoid duplicates.

⚠️⚠️ **This change may break snapshots** since the variable names are not hashed anymore ⚠️⚠️