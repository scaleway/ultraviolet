import type { Meta } from '@storybook/react-vite'
import { DynamicIllustration } from '..'

export default {
  component: DynamicIllustration,
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
  title: 'Illustrations/DynamicIllustration',
} as Meta<typeof DynamicIllustration>

export { Playground } from './Playground.stories'
export { List } from './List.stories'
