import type { Meta } from '@storybook/react-vite'
import { BarStack } from '..'

export default {
  component: BarStack,
  title: 'UI/Data Display/BarStack',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof BarStack>

export { Playground } from './Playground.stories'
export { WithMax } from './WithMax.stories'
export { Label } from './Label.stories'
export { Legend } from './Legend.stories'
export { Size } from './Size.stories'
