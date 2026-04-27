import { Button } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Button,
  title: 'UI/Action/Button',
  parameters: {
    a11y: 'partial',
  },
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
