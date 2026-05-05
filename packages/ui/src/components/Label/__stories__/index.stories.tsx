import { Label } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Label,
  title: 'UI/Typography/Label',
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
} as Meta
export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { LabelDescription } from './LabelDescription.stories'
export { Size } from './Size.stories'
export { Usage } from './Usage.stories'
