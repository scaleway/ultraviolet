---
"@ultraviolet/ui": minor
---
### **⚠️⚠️ BREAKING CHANGES ⚠️⚠️**

`Chip.Icon`: prop `name` (string) has been  replaced with `icon` (ReactNode). To add an icon, simply pass the selected icon to the component instead of its name:

Before: 
```js
<Chip>
  MyChip
  <Chip.Icon name="filter" />
</Chip>
````
After: 
```js
import { FilterIcon } from '@ultraviolet/icons/FilterIcon'

<Chip>
  MyChip
  <Chip.Icon icon={<FilterIcon />} />
</Chip>
```

`SelectableCard`: prop `productIcon` and `illustration ` are now a ReactNode, like in `Chip.Icon`. Be careful with the sizes: to obtain the same result as before, the product icons must have `size="large"`.


Before: 
```js
 <SelectableCard
  {...args}
  label="ProductIcon"
  name="label-1"
  productIcon="macMiniM2"
  type="radio"
  value="label-1"
>
 <SelectableCard
  {...args}
  label="Illustration"
  name="label-1"
  illustration="url"
  type="radio"
  value="label-1"
>
```

After: 
```js
import { MacMiniProductIcon } from '@ultraviolet/icons/product/MacMiniProductIcon'

 <SelectableCard
  {...args}
  label="ProductIcon"
  name="label-1"
  productIcon={<MacMiniProductIcon size="large" />}
  value="label-1"
>
 <SelectableCard
  {...args}
  label="Illustration"
  name="label-1"
  illustration={<img src={url} />} //or illustration={<DynamicIllustration name="appleSiliconM2" />}
  value="label-1"
>
```


>Those changes avoid importing all ProductIcons by default in `@ultraviolet/ui`.