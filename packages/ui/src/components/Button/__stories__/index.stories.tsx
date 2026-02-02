import type { Meta } from '@storybook/react-vite'
import { Button } from '..'

export default {
  component: Button,
  title: 'Components/Action/Button',
} as Meta<typeof Button>

export { Playground } from './Playground.stories'
export { Showcase } from './Showcase.stories'
export { Size } from './Size.stories'
export { IconOnly } from './IconOnly.stories'
export { IsLoading } from './IsLoading.stories'
export { FullWidth } from './FullWidth.stories'
export { Tooltip } from './Tooltip.stories'
export { AsLink } from './AsLink.stories'
export { Render } from './Render.stories'
