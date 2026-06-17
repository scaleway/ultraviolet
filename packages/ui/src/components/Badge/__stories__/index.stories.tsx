import type { Meta } from '@storybook/react-vite'
import { Badge } from '..'

export default {
  component: Badge,
  title: 'UI/Badges/Badge',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Badge>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Prominences } from './Prominences.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Icon } from './Icon.stories'
