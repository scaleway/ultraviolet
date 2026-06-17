import type { Meta } from '@storybook/react-vite'
import { Stack } from '..'

export default {
  component: Stack,
  title: 'UI/Layout/Stack',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
} as Meta<typeof Stack>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { Direction } from './Direction.stories'
export { AlignItems } from './AlignItems.stories'
export { JustifyContent } from './JustifyContent.stories'
export { Responsive } from './Responsive.stories'
