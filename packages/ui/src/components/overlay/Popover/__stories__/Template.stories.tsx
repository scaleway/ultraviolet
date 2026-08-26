import type { StoryFn } from '@storybook/react-vite'
import { HelpCircleOutlineIcon } from '@ultraviolet/icons/HelpCircleOutlineIcon'
import { Popover } from '..'

export const Template: StoryFn<typeof Popover> = props => (
  <Popover
    visible
    {...props}
    content="This is a simple text content inside the popover. You can customize it by passing text into content property."
    title="Popover Title"
  >
    <HelpCircleOutlineIcon size="large" />
  </Popover>
)
