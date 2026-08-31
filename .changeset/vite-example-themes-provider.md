---
"@examples/vite": patch
---

Migrate the Vite example to use the new `ThemesProvider` and `useThemes` hook instead of the runtime `ThemeProvider`. The app now loads the static `light.css` / `dark.css` / `darker.css` CSS files and toggles theme classes on `<html>`, matching the Next.js example.
