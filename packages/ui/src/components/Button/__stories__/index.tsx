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
    deprecated: true,
    deprecatedReason:
      'This component is deprecated please use ButtonV2 instead.',
    migrationLink: 'migrations-button-v1-to-buttonv2--page',
    docs: {
      description: {
        component:
          'A button is a component used to define a call to action (or a link, but that should be avoid if possible)',
      },
    },
  },
  title: 'Components/Action/Button',
} as ComponentMeta<typeof Button>

export { Playground } from './Playground'
export { Variant } from './Variant'
export { Link } from './Link'
export { Size } from './Size'
export { Disabled } from './Disabled'
export { Tooltip } from './Tooltip'
export { Icon } from './Icon'
export { IconSize } from './IconSize'
export { IconPosition } from './IconPosition'
export { Extend } from './Extend'
export { Progress } from './Progress'
export { Action } from './Action'
export { Download } from './Download'
