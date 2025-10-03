---
"@ultraviolet/ui": major
---

! BREAKING CHANGES ! 
In order to start using the new style, you will need to import new `<ThemeProvider />` and import new CSS generated at build time:

```tsx
import { ThemeProvider } from '@emotion/react'
import { consoleLightTheme, ThemeProvider as ThemeProviderUV } from '@ultraviolet/themes'

import "@ultraviolet/ui/styles" // Generated CSS used by components

export const App = (children) => {
  <ThemeProvider theme={consoleLightTheme}>
    <ThemeProviderUV>
       {children}
    </ThemeProviderUV>
  </ThemeProvider>
}
```
