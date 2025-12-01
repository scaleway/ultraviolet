import type { Meta } from '@storybook/react-vite'
import { BarStack } from '..'

export default {
  component: BarStack,
  title: 'Components/Data Display/BarStack',
} as Meta<typeof BarStack>

export { Playground } from './Playground.stories'
export { WithMax } from './WithMax.stories'
export { Label } from './Label.stories'
export { Legend } from './Legend.stories'
export { Size } from './Size.stories'
