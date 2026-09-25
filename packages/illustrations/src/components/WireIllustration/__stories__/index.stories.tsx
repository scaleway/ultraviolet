import type { Meta } from '@storybook/react-vite'
import { WireIllustration } from '..'

export default {
  component: WireIllustration,
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
  title: 'Illustrations/WireIllustration',
} as Meta<typeof WireIllustration>

export { Playground } from './Playground.stories'
export { List } from './List.stories'
