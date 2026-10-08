---
"@ultraviolet/themes": minor
---

New `ThemeProvider` (`/v2/ThemeProvider`) : this provider will replace the V1 in the future. To use it, it is necessary to import css files with ultraviolet's themes:
```js
import '@ultraviolet/themes/light.css'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css'
// OR
import '@ultraviolet/themes/themes.css' // import all 3 themes at once
```
Theme switching is done internally by the provider, use `v2/useTheme` to retrieve the current theme :
```js
const { theme } = useTheme() // theme: "dark" | "light" | "darker"
```

Our components currently support both `ThemeProvider` and `v2/ThemeProvider`, but only one is necessary.

Example of theme switcher using the new provider: 
```js
import { instanceOriginal } from '@ultraviolet/illustrations/products/instance'
import { ThemeProvider, useTheme } from '@ultraviolet/themes/v2'
import type { Themes } from '@ultraviolet/themes'
import {
  SwitchButton,
} from '@ultraviolet/ui'
import '@ultraviolet/ui/styles' // Import styles for the UI components
import '@ultraviolet/themes/global'

// Import all tokens
import '@ultraviolet/themes/light.css'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <SwitchButton
      onChange={event => {
        setTheme(event.currentTarget.value as Themes)
      }}
      value={theme}
    >
      <SwitchButton.Option value="light">light mode</SwitchButton.Option>
      <SwitchButton.Option value="dark">dark mode</SwitchButton.Option>
      <SwitchButton.Option value="darker">darker mode</SwitchButton.Option>
    </SwitchButton>
  )
}

```