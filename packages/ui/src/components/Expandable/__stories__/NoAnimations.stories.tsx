import type { StoryFn } from '@storybook/react-vite'
import { MinusIcon } from '@ultraviolet/icons/MinusIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Expandable } from '..'

export const NoAnimations: StoryFn<typeof Expandable> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <>
      <Button onClick={toggle}>
        {toggled ? <MinusIcon /> : <PlusIcon />}
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable {...args} animationDuration={0} opened={toggled}>
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
