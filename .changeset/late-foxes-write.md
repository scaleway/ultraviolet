---
"@ultraviolet/icons": minor
---

`Logos` now support dark versions. When no dark version is provided (i.e. `/assets/dark/NAME.svg` does not exist while `/assets/light/NAME.svg` does), the light version is displayed as a fallback. *Light* assets are required, as components are indexed from `/assets/light/`.