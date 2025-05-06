import type { StoryFn } from '@storybook/react'
import { MinusIcon, PlusIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Expandable } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Controlled: StoryFn<typeof Expandable> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <>
      <Button onClick={toggle}>
        {toggled ? <MinusIcon /> : <PlusIcon />}
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable {...args} opened={toggled}>
        I&lsquo;m a visible Expandable content
      </Expandable>
    </>
  )
}

Controlled.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
]
