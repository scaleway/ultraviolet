---
"@ultraviolet/ui": major
---

Following the icon major update some components have recieved a small update to improve the usage of icons.

## Detailed migration per components

### Button

`icon`, `iconPosition`, `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

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

### Badge

`icon` props is deprecated. You can directly use the imported icon you need in the children.

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

### Bullet

`icon` and `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

```tsx
// Before
import { Bullet } from '@ultraviolet/ui'

<Bullet icon="check" />
<Bullet icon="check" iconVariant="outlined" />
```

```tsx
// After
import { Bullet } from '@ultraviolet/ui'
import { CheckIcon, CheckCircleOutlineIcon } from '@ultraviolet/icons'

<Bullet>
  <CheckIcon />
</Bullet>

<Bullet>
  <CheckCircleOutlineIcon />
</Bullet>
```

### AvatarV2

`icon` prop is deprecated. You can directly use the imported icon you need in the children.

```tsx
// Before
import { AvatarV2 } from '@ultraviolet/ui'

<AvatarV2 variant="icon" shape="circle" sentiment="primary" icon="mosaic" />
```

```tsx
// After
import { AvatarV2 } from '@ultraviolet/ui'
import { MosaicIcon } from '@ultraviolet/icons'

<AvatarV2 variant="icon" shape="circle" sentiment="primary">
  <MosaicIcon size="xlarge" />
</AvatarV2>
```

### Separator

`icon` prop is deprecated. You can directly use the imported icon you need in the children.

```tsx
// Before
import { Separator } from '@ultraviolet/ui'

<Separator direction="vertical" icon="ray-top-arrow" />
```

```tsx
// After
import { Separator } from '@ultraviolet/ui'
import { RayTopArrowIcon } from '@ultraviolet/icons'

<Separator direction="vertical">
  <RayTopArrowIcon size="medium" />
</Separator>
```


### Tag

`icon` prop is deprecated. You can directly use the imported icon you need in the children.

```tsx
// Before
import { Tag } from '@ultraviolet/ui'

<Tag icon="check">
  Valid
</Tag>
```

```tsx
// After
import { Tag } from '@ultraviolet/ui'
import { CheckIcon } from '@ultraviolet/icons'

<Tag>
  <CheckIcon size="small" />
  Valid
</Tag>
```
