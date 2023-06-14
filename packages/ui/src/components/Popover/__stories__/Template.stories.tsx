import type { StoryFn } from '@storybook/react'
import { Popover } from '..'
import { Icon } from '../../Icon'

export const Template: StoryFn<typeof Popover> = props => (
  <Popover
    visible
    {...props}
    title="Popover Title"
    content="This is a simple text content inside the popover. You can customize it by passing text into content property."
  >
    <Icon name="help-circle-outline" size={24} />
  </Popover>
)
