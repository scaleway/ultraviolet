import type { StoryFn } from '@storybook/react'
import { HelpCircleOutlineIcon } from '@ultraviolet/icons'
import { Popover } from '..'

export const Template: StoryFn<typeof Popover> = props => (
  <Popover
    visible
    {...props}
    title="Popover Title"
    content="This is a simple text content inside the popover. You can customize it by passing text into content property."
  >
    <HelpCircleOutlineIcon size="large" />
  </Popover>
)
