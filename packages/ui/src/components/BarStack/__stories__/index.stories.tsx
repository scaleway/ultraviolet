import { BarStack } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: BarStack,
  title: 'UI/Data Display/BarStack',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof BarStack>

export { Playground } from './Playground.stories'
export { WithMax } from './WithMax.stories'
export { Label } from './Label.stories'
export { Legend } from './Legend.stories'
export { Size } from './Size.stories'
