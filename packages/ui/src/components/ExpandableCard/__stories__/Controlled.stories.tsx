import type { StoryFn } from '@storybook/react-vite'
import { useReducer } from 'react'
import { Button, Stack } from '../..'
import { ExpandableCard } from '..'

export const Controlled: StoryFn<typeof ExpandableCard> = args => {
  const [expanded, onToggleExpand] = useReducer(prevState => !prevState, false)

  return (
    <Stack gap={1}>
      <Button onClick={onToggleExpand}>
        Click me to {expanded ? 'collapse' : 'expanded'} the card
      </Button>
      <ExpandableCard
        {...args}
        header="Controlled"
        expanded={expanded}
        onToggleExpand={onToggleExpand}
      >
        A nice content
      </ExpandableCard>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'Component supports a `controlled` mode. Both `expanded` and `onToggleExpanded` must be provided to control the component.',
    },
  },
}
