import type { Meta } from '@storybook/react-vite'
import { Badge } from '..'

export default {
  component: Badge,
  title: 'Components/Badges/Badge',
} as Meta<typeof Badge>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Prominences } from './Prominences.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Icon } from './Icon.stories'
