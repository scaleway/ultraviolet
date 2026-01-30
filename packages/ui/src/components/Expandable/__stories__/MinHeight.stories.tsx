import type { StoryFn } from '@storybook/react-vite'
import { MinusIcon } from '@ultraviolet/icons/MinusIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Expandable } from '..'

export const MinHeight: StoryFn<typeof Expandable> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <>
      <Button onClick={toggle}>
        {toggled ? <MinusIcon /> : <PlusIcon />}
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable {...args} minHeight={35} opened={toggled}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Expandable>
    </>
  )
}

MinHeight.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
]

MinHeight.parameters = {
  docs: {
    description: {
      story:
        'The `minHeight` prop allows you to display partially the content of the Expandable component. This is useful when you want to display a preview of the content and let the user expand it to see the full content.',
    },
  },
}
