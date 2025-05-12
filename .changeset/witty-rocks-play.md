---
"@ultraviolet/icons": major
---

**Beta 1 - Migration of Icons to @ultraviolet/icons with direct imports**

- `Icon` component has been removed it was previously imported like `import { Icon } from '@ultraviolet/icons/legacy'`. Instead you should import the icon you need directly from `@ultraviolet/icons`.
  
  Before:
  ```tsx
  import { Icon } from '@ultraviolet/icons/legacy'
  
  <Icon name="drag" />
  ```
  
  After:
  ```tsx
  import { DragIcon } from '@ultraviolet/icons'
    
  <DragIcon />
  ```

### Icons removed
- `DocumentDbProductIcon`: no replacement.
- `AsteriskIcon`: use * in ASCII instead.
- `CrossCircleIcon` use `CloseCircleOutlineIcon` instead.
- `CrossCircleOutlineIcon` use `CloseCircleOutlineIcon` instead.
- `DragVariantIcon`: use `DragIcon` instead.

### System icons changes
- prop `size` no longer support `string` and `number`. You shoud use the sizes supported by the component (`xmsall`, `small`, ect.). Example:
  ```tsx
  import { DragIcon } from '@ultraviolet/icons'
  
  // Before
  <DragIcon size={16} />
  
  // After
  <DragIcon size="small" />
  ```
