---
"@ultraviolet/themes": minor
---

To replace `Global` from Emotion and `normalize` from `@ultraviolet/ui`, you can now directly import the style as CSS to use in your app:

Before: 
```tsx
import { Global } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import { ThemeProvider } from '@ultraviolet/themes'

const App = () => (
    <ThemeProvider theme={theme}>
        <Global styles={css`${normalize()}`}>
        <MyApp />
    </ThemeProvider>
)

```

After :
```tsx
import { ThemeProvider } from '@ultraviolet/themes'
import '@ultraviolet/themes/global'

const App = () => (
    <ThemeProvider theme={theme}>
        <MyApp />
    </ThemeProvider>
)
```
