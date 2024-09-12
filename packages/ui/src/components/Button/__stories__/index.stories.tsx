import type { Meta } from '@storybook/react'
import { Button } from '..'
import { AsLink } from './AsLink.stories'
import { FullWidth } from './FullWidth.stories'
import { IconOnly } from './IconOnly.stories'
import { IconPosition } from './IconPosition.stories'
import { IsLoading } from './IsLoading.stories'
import { Playground } from './Playground.stories'
import { Showcase } from './Showcase.stories'
import { Size } from './Size.stories'
import { Tooltip } from './Tooltip.stories'

export default {
  component: Button,
  title: 'Components/Action/Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://...',
      examples: [
        Playground,
        Showcase,
        Size,
        IconOnly,
        IconPosition,
        IsLoading,
        FullWidth,
        Tooltip,
        AsLink,
      ],
    },
  },
} as Meta<typeof Button>

export { Playground } from './Playground.stories'
export { Showcase } from './Showcase.stories'
export { Size } from './Size.stories'
export { IconOnly } from './IconOnly.stories'
export { IconPosition } from './IconPosition.stories'
export { IsLoading } from './IsLoading.stories'
export { FullWidth } from './FullWidth.stories'
export { Tooltip } from './Tooltip.stories'
export { AsLink } from './AsLink.stories'
