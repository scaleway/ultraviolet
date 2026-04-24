import { Bullet } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Bullet,
  title: 'UI/Badges/Bullet',
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
} as Meta<typeof Bullet>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Disabled } from './Disabled.stories'
export { Icon } from './Icon.stories'
export { Sizes } from './Sizes.stories'
export { Text } from './Text.stories'
export { Tooltip } from './Tooltip.stories'
