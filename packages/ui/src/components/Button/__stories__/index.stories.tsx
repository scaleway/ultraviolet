import type { ComponentMeta } from '@storybook/react'
import { Button } from '..'

export default {
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A button is a component used to define a call to action.',
      },
    },
  },
  title: 'Components/Action/Button',
} as ComponentMeta<typeof Button>

export { Playground } from './Playground.stories'
export { Showcase } from './Showcase.stories'
export { Size } from './Size.stories'
export { IconOnly } from './IconOnly.stories'
export { IconPosition } from './IconPosition.stories'
export { IsLoading } from './IsLoading.stories'
export { FullWidth } from './FullWidth.stories'
export { Tooltip } from './Tooltip.stories'
export { AsLink } from './AsLink.stories'
