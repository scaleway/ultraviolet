---
"@ultraviolet/themes": minor
---

New `ThemeProvider` (`/v2/ThemeProvider`) : this provider will replace the V1 in the future. To use it, it is necessary to import css files with ultraviolet's themes. For me details, please refer to the [README](https://github.com/scaleway/ultraviolet/tree/main/packages/themes#with-static-css-files-and-new-themeprovider-v2).

Our components currently support both `ThemeProvider` and `v2/ThemeProvider`, but only one is necessary.

New exported theme types: `Theme`, `ThemeOption`

New hook: `usePrefersDarkMode`