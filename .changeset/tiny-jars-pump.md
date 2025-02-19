---
"@ultraviolet/ui": minor
---

More component have `icon` prop deprecated. You can directly use the imported icon you need in the children.

Here is the list of components with `icon` prop deprecated and how to migrate them:

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

You can find this migration documented in the [Ultraviolet UI Storybook](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-migrate-icon-usages--docs).
