import type { StoryFn } from '@storybook/react-vite'
import { MinusIcon, PlusIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Expandable } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const NoAnimations: StoryFn<typeof Expandable> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <>
      <Button onClick={toggle}>
        {toggled ? <MinusIcon /> : <PlusIcon />}
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable {...args} opened={toggled} animationDuration={0}>
        I&lsquo;m a visible Expandable content
      </Expandable>
    </>
  )
}

NoAnimations.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
]

NoAnimations.parameters = {
  docs: {
    description: {
      story:
        'You can disabled the expandable animation using `animationDuration={0}`. This will make the expandable content appear instantly without any animation. It is also a much simpler component behind the hood that could improve performance.',
    },
  },
}
