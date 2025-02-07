---
"@ultraviolet/icons": patch
"@ultraviolet/form": patch
"@ultraviolet/plus": patch
"@ultraviolet/ui": patch
---

- System Icons from `@ultraviolet/icons` have a change in their sizing. `large` became `medium` and a new `large` sizing has been created (around 24px)
- `<Button />` the prop `icon`, `iconPosition` and `iconSentiment` has been marked as deprecated and will be removed in future major release. You should use the icon component directly in the children of the button:
```tsx
// Before
import { Button } from '@ultraviolet/ui'

<Button icon="pencil" iconPosition="right" iconVariant="outline">
  Edit
</Button>
```

```tsx
// After
import { Button } from '@ultraviolet/ui'
import { PencilOutlineIcon } from '@ultraviolet/icons'

<Button>
  Edit <PencilOutlineIcon />
</Button>
```
- Fix of other legacy usages of icons into the library
