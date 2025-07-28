import type { Meta } from '@storybook/react-vite'
import { DynamicIllustration } from '..'

export default {
  component: DynamicIllustration,
  title: 'Illustrations/DynamicIllustration',
} as Meta<typeof DynamicIllustration>

export { List } from './List.stories'
export { Playground } from './Playground.stories'
