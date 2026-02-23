---
"@ultraviolet/ui": minor
---

Export all components vanilla-extract classnames. All the classes for a single component are added in a single obejct : for instance, to get the vanilla-extract classname of a drawer footer, simply write :

```js
import { drawerStyle } from '@ultraviolet/ui'

const footerClassName = drawerStyle.drawerFooter // → uv_1iezf7ya
```

Beware, some vanilla-extract classname are `styleVariants`. They must be used as follow : 

```js
import { drawerStyle } from '@ultraviolet/ui'

const drawerClassName       = drawerStyle.drawer    // → { large: "uv_1iezf7y3", medium: "uv_1iezf7y4", small: "uv_1iezf7y5" }
const drawerClassNameSmall  = drawerClassName.small // → uv_1iezf7y5
```

There are also `recipe`: 
```js
import { badgeStyle } from '@ultraviolet/ui'

const badgeStyle    = badgeStyle.badge                      // → function
const badgeDefault  = badgeStyle()                          // → uv_1yf71jy0 uv_1yf71jy2 uv_1yf71jy7 uv_1yf71jye uv_1yf71jyn
const badgePrimary  = badgeStyle({ sentiment : 'primary' }) // → uv_1yf71jy0 uv_1yf71jy2 uv_1yf71jy5 uv_1yf71jye uv_1yf71jyj
```

Composition styles are available in `@ultraviolet/ui/compositions/styles`:

```js
import { orderSummaryStyle } from '@ultraviolet/ui/compositions/styles'
import { OrderSummary } from '@ultraviolet/ui/compositions/OrderSummary'
```

You **do not** need to import the component's styles for them to display correctly. These styles are exported to simplify customization using classnames.
