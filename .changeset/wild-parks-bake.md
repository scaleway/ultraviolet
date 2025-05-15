---
"@ultraviolet/themes": major
---

⚠️ **Breaking Changes**

The following tokens are now removed. Please update your code to use the new tokens system.

#### Screens

Screen changed from `number` to `string` type to include `px` unit. The new values are now in `px` instead of `number`. The new values are:

- New `xxsmall`
- `theme.screens.xsmall` -> `theme.breakpoints.xsmall`
- `theme.screens.small` -> `breakpoints.small`
- `theme.screens.medium` -> `theme.breakpoints.medium`
- `theme.screens.large` -> `theme.breakpoints.large`
- `theme.screens.xlarge` -> `theme.breakpoints.xlarge`

#### Colors

Some colors tokens have been removed. Here are the following tokens that are now removed:

**Danger**
- `theme.colors.danger.backgroundWeak`
- `theme.colors.danger.backgroundWeakDisabled`
- `theme.colors.danger.backgroundWeakHover`
- `theme.colors.danger.borderWeak`
- `theme.colors.danger.borderWeakDisabled`
- `theme.colors.danger.borderWeakHover`
- `theme.colors.danger.iconWeak`
- `theme.colors.danger.iconWeakDisabled`
- `theme.colors.danger.iconWeakHover`
- `theme.colors.danger.textWeak`
- `theme.colors.danger.textWeakDisabled`
- `theme.colors.danger.textWeakHover`

**Info**
- `theme.colors.info.backgroundWeak`
- `theme.colors.info.backgroundWeakDisabled`
- `theme.colors.info.backgroundWeakHover`
- `theme.colors.info.borderWeak`
- `theme.colors.info.borderWeakDisabled`
- `theme.colors.info.borderWeakHover`
- `theme.colors.info.iconWeak`
- `theme.colors.info.iconWeakDisabled`
- `theme.colors.info.iconWeakHover`
- `theme.colors.info.textWeak`
- `theme.colors.info.textWeakDisabled`
- `theme.colors.info.textWeakHover`

**Primary**
- `theme.colors.primary.backgroundWeak`
- `theme.colors.primary.backgroundWeakDisabled`
- `theme.colors.primary.backgroundWeakHover`
- `theme.colors.primary.borderWeak`
- `theme.colors.primary.borderWeakDisabled`
- `theme.colors.primary.borderWeakHover`
- `theme.colors.primary.iconWeak`
- `theme.colors.primary.iconWeakDisabled`
- `theme.colors.primary.iconWeakHover`
- `theme.colors.primary.textWeak`
- `theme.colors.primary.textWeakDisabled`
- `theme.colors.primary.textWeakHover`

**Secondary**
- `theme.colors.secondary.backgroundWeak`
- `theme.colors.secondary.backgroundWeakDisabled`
- `theme.colors.secondary.backgroundWeakHover`
- `theme.colors.secondary.borderWeak`
- `theme.colors.secondary.borderWeakDisabled`
- `theme.colors.secondary.borderWeakHover`
- `theme.colors.secondary.iconWeak`
- `theme.colors.secondary.iconWeakDisabled`
- `theme.colors.secondary.iconWeakHover`
- `theme.colors.secondary.textWeak`
- `theme.colors.secondary.textWeakDisabled`
- `theme.colors.secondary.textWeakHover`

**Success**
- `theme.colors.success.backgroundWeak`
- `theme.colors.success.backgroundWeakDisabled`
- `theme.colors.success.backgroundWeakHover`
- `theme.colors.success.borderWeak`
- `theme.colors.success.borderWeakDisabled`
- `theme.colors.success.borderWeakHover`
- `theme.colors.success.iconWeak`
- `theme.colors.success.iconWeakDisabled`
- `theme.colors.success.iconWeakHover`
- `theme.colors.success.textWeak`
- `theme.colors.success.textWeakDisabled`
- `theme.colors.success.textWeakHover`

**Warning**
- `theme.colors.warning.backgroundWeak`
- `theme.colors.warning.backgroundWeakDisabled`
- `theme.colors.warning.backgroundWeakHover`
- `theme.colors.warning.borderWeak`
- `theme.colors.warning.borderWeakDisabled`
- `theme.colors.warning.borderWeakHover`
- `theme.colors.warning.iconWeak`
- `theme.colors.warning.iconWeakDisabled`
- `theme.colors.warning.iconWeakHover`
- `theme.colors.warning.textWeak`
- `theme.colors.warning.textWeakDisabled`
- `theme.colors.warning.textWeakHover`

**Other Gradients**
- `theme.colors.other.gradients.background.gold`
- `theme.colors.other.gradients.background.purple`
- `theme.colors.other.gradients.background.strong`
- `theme.colors.other.gradients.background.accent`
- `theme.colors.other.gradients.background.aqua`
- `theme.colors.other.gradients.background.blue`
- `theme.colors.other.gradients.background.emerald`
- `theme.colors.other.gradients.background.fuschia`
- `theme.colors.other.gradients.background.magenta`
- `theme.colors.other.gradients.background.primary`

#### Typography

There is a change in the typography font family. We now use `Inter`, `JetBrains` and `Space Grotesk` as the default font.
In order to be always up to date we recommend you installing `@ultraviolet/fonts` package and import it in your App entry point.

```tsx
import '@ultraviolet/fonts/fonts.css'
```
