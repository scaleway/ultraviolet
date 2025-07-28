import type { Meta } from '@storybook/react-vite'
import { Button } from '..'

export default {
  component: Button,
  title: 'Components/Action/Button',
} as Meta<typeof Button>

export { AsLink } from './AsLink.stories'
export { FullWidth } from './FullWidth.stories'
export { IconOnly } from './IconOnly.stories'
export { IsLoading } from './IsLoading.stories'
export { Playground } from './Playground.stories'
export { Showcase } from './Showcase.stories'
export { Size } from './Size.stories'
export { Tooltip } from './Tooltip.stories'
