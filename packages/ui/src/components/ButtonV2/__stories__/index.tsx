import type { ComponentMeta } from '@storybook/react'
import { ButtonV2 } from '..'

export default {
  component: ButtonV2,
  parameters: {
    docs: {
      description: {
        component: 'A button is a component used to define a call to action.',
      },
    },
  },
  title: 'Components/Action/ButtonV2',
} as ComponentMeta<typeof ButtonV2>

export { Playground } from './Playground'
export { Showcase } from './Showcase'
export { Size } from './Size'
export { IconOnly } from './IconOnly'
export { IconPosition } from './IconPosition'
export { IsLoading } from './IsLoading'
export { FullWidth } from './FullWidth'
export { AsLink } from './AsLink'
