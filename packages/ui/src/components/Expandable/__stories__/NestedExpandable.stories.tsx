import type { StoryFn } from '@storybook/react'
import { MinusIcon, PlusIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Expandable } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const NestedExpandable: StoryFn<typeof Expandable> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  const [toggledNested, onToggleNested] = useState(false)
  const toggleNested = () => onToggleNested(state => !state)

  return (
    <>
      <Button onClick={toggle}>
        {toggled ? <MinusIcon /> : <PlusIcon />}
        Click me to {toggled ? 'hide' : 'show'} content
      </Button>
      <Expandable opened={toggled}>
        <Button onClick={toggleNested}>
          {toggled ? <MinusIcon /> : <PlusIcon />}
          Click me to {toggledNested ? 'hide' : 'show'} content
        </Button>
        <Expandable {...args} opened={toggledNested}>
          I am the nested expandable content
        </Expandable>
        I am the first child of the Expandable component
      </Expandable>
    </>
  )
}

NestedExpandable.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
]

NestedExpandable.parameters = {
  docs: {
    description: {
      story:
        'Expandable can be nested inside another Expandable the component can handle it.',
    },
  },
}
