import type { ComponentMeta } from '@storybook/react'
import { Button } from '..'

export default {
  component: Button,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', gap: 16 }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A button is a component used to define a call to action (or a link, but that should be avoid if possible)',
      },
    },
  },
  title: 'Components/Action/Button',
} as ComponentMeta<typeof Button>

export { Playground } from './Playground.stories'
export { Variant } from './Variant.stories'
export { Link } from './Link.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
export { Tooltip } from './Tooltip.stories'
export { Icon } from './Icon.stories'
export { IconSize } from './IconSize.stories'
export { IconPosition } from './IconPosition.stories'
export { Extend } from './Extend.stories'
export { Progress } from './Progress.stories'
export { Action } from './Action.stories'
export { Download } from './Download.stories'
