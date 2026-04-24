import { Badge } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Badge,
  title: 'UI/Badges/Badge',
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
} as Meta<typeof Badge>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Prominences } from './Prominences.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Icon } from './Icon.stories'
