import type { ComponentStory } from '@storybook/react'
import { Popover } from '..'
import { Icon } from '../../Icon'

export const Template: ComponentStory<typeof Popover> = props => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Popover
      visible
      {...props}
      title="Popover Title"
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
    >
      <Icon name="help-circle-outline" size={24} />
    </Popover>
  </div>
)
