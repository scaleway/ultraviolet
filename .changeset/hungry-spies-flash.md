---
"@ultraviolet/icons": major
---

! BREAKING CHANGES !

New big change in icons, we added a new way to import icons. You can now directly import the icon name through `@ultraviolet/icons`.

```tsx
// Before
import { Icon } from '@ultraviolet/icons';

const MyComponent = () => (
  <Icon name="address" sentiment="danger" size="small" />
);
```

```tsx
// Now
import { Address } from '@ultraviolet/icons';
// OR
import { Address } from '@ultraviolet/icons/Address';

const MyComponent = () => (
  <Address sentiment="danger" size="small" />
);
```

This change will make it easier to use icons in your project and reduce the bundle size.
Exact same pattern is changed for `<CategoryIcon />` and `<ProductIcon />`:

```tsx
// Before
import { CategoryIcon } from '@ultraviolet/icons';

// Now
import { Baremetal } from '@ultraviolet/icons/category';
// OR
import { Baremetal } from '@ultraviolet/icons/category/Baremetal';
```

```tsx
// Before
import { ProductIcon } from '@ultraviolet/icons';

// Now
import { Instance } from '@ultraviolet/icons/product';
// OR
import { Instance } from '@ultraviolet/icons/product/Instance';
```
