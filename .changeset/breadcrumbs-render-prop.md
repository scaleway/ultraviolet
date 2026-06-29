---
"@ultraviolet/ui": minor
---

`Breadcrumbs.Item`: add `render` prop to support custom link components (e.g., React Router `Link`, Next.js `Link`)

### Added
- `render` prop to `Breadcrumbs.Item` component for custom element rendering
- Support for both element form (`render={<CustomLink />}`) and function form (`render={(props) => <CustomLink {...props} />}`)


### Usage Example

```tsx
import Link from 'next/link'
import { Breadcrumbs } from '@ultraviolet/ui'

<Breadcrumbs>
  <Breadcrumbs.Item render={(props) => <Link {...props} href="/"/ >}>Home</Breadcrumbs.Item>
  <Breadcrumbs.Item render={(props) => <Link {...props} href="/products"/>}>Product</Breadcrumbs.Item>
  <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
</Breadcrumbs>
```

This change enables seamless integration with routing libraries while preserving Breadcrumbs styling and accessibility features.
