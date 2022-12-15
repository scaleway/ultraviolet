import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import Expandable from '..'
import Button from '../../Button'
import Stack from '../../Stack'

export const Controlled: ComponentStory<typeof Expandable> = () => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <>
      <Button
        icon={toggled ? 'minus-box-outline' : 'plus-box-outline'}
        onClick={toggle}
      >
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable opened={toggled}>
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
