import type { Meta } from '@storybook/react-vite'
import { WireIllustration } from '..'

export default {
  component: WireIllustration,
  title: 'Illustrations/WireIllustration',
} as Meta<typeof WireIllustration>

export { Playground } from './Playground.stories'
export { List } from './List.stories'
