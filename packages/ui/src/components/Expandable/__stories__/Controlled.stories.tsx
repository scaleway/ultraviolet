import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Expandable } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Controlled: StoryFn<typeof Expandable> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <div
      style={{
        flexWrap: 'nowrap',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Button icon={toggled ? 'minus' : 'plus'} onClick={toggle}>
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable {...args} opened={toggled}>
        <Stack gap={1}>
          <div>I&lsquo;m a visible Expandable content</div>
          <div>feofpwefok weopkf powekf </div>
        </Stack>
      </Expandable>
    </div>
  )
}

Controlled.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
]
