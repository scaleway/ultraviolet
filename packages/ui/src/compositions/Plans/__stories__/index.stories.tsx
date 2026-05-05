import { Plans } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Plans,
  title: 'Compositions/Plans',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
    experimental: true,
  },
} as Meta<typeof Plans>

export { Playground } from './Playground.stories'
export { HideLabels } from './HideLabels.stories'
export { WithIcon } from './WithIcon.stories'
export { Selectable } from './Selectable.stories'
export { Highlight } from './Highlight.stories'
