import { Stack } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Stack,
  title: 'UI/Layout/Stack',
  parameters: {
    a11y: 'compliant',
    audit: {
      'keyboard-focus': true,
      'contrast-visuals': true,
      'semantics-screen-reader': true,
      'pointer-touch': true,
      'specific-patterns': true,
    },
  },
} as Meta<typeof Stack>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { Direction } from './Direction.stories'
export { AlignItems } from './AlignItems.stories'
export { JustifyContent } from './JustifyContent.stories'
export { Responsive } from './Responsive.stories'
