import type { StoryFn } from '@storybook/react-vite'
import { MinusIcon } from '@ultraviolet/icons/MinusIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { useState } from 'react'
import { Expandable } from '..'
import { Stack } from '../../../layout/Stack'
import { Button } from '../../Button'

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
