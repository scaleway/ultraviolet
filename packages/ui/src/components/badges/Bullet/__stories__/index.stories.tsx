import type { Meta } from '@storybook/react-vite'
import { Bullet } from '..'

export default {
  component: Bullet,
  title: 'UI/Badges/Bullet',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: true,
      understandable: true,
      robust: false,
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
