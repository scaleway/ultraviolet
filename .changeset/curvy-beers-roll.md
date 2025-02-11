---
"@ultraviolet/ui": patch
---

In `<Badge />` component, `icon` props is deprecated. You can directly use the imported icon you need in the children.

```tsx
// Before
import { Badge } from '@ultraviolet/ui'

<Badge icon="pencil">
  Edit
</Button>
```

```tsx
// After
import { Badge } from '@ultraviolet/ui'
import { PencilOutlineIcon } from '@ultraviolet/icons'

<Badge>
  Edit <PencilOutlineIcon />
</Badge>
```
