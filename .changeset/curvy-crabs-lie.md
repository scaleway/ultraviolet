---
"@ultraviolet/plus": minor
---

### **⚠️⚠️ BREAKING CHANGES ⚠️⚠️**

`FAQ`: prop `productIconName` (string) has been replaced with `productIcon` (ReactNode). To add an icon, simply pass the selected icon to the component instead of its name:

Before: 
```js
<FAQ 
  description="description"
  productIconName="sms"
  title="title"
/>
```
After: 
```js
import { SmsProductIcon } from '@ultraviolet/icons/product/SmsProductIcon'

<FAQ 
  description="description"
  productIconName={<SmsProductIcon size="xlarge" />}
  title="title"
/>
```
Be careful with the sizes: to obtain the same result as before, the product icons must have `size="xlarge"`.

>This change avoids importing all ProductIcons by default in `@ultraviolet/plus`.