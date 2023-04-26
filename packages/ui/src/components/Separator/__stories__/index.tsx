import type { Meta } from '@storybook/react'
import { Separator } from '..'

export default {
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: 'A horizontal or vertical separator.',
      },
    },
  },
  title: 'Components/Layout/Separator',
} as Meta

export { Playground } from './Playground'
export { Thickness } from './Thickness'
export { Direction } from './Direction'
export { Color } from './Color'
export { Icon } from './Icon'
