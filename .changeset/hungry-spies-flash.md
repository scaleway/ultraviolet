---
"@ultraviolet/icons": minor
---

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

const MyComponent = () => (
  <Address sentiment="danger" size="small" />
);
```

This change will make it easier to use icons in your project and reduce the bundle size.
Both system will continue to work, but we recommend using the new way to import icons.
```
