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

export { Playground } from './Playground.stories'
export { Showcase } from './Showcase.stories'
export { Size } from './Size.stories'
export { IconOnly } from './IconOnly.stories'
export { IconPosition } from './IconPosition.stories'
export { IsLoading } from './IsLoading.stories'
export { FullWidth } from './FullWidth.stories'
