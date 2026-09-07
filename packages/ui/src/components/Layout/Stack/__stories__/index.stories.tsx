import type { Meta } from '@storybook/react-vite'
import { Stack } from '..'

export default {
  component: Stack,
  title: 'UI/Layout/Stack',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof Stack>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { Direction } from './Direction.stories'
export { AlignItems } from './AlignItems.stories'
export { JustifyContent } from './JustifyContent.stories'
export { Responsive } from './Responsive.stories'
