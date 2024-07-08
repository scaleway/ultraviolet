import type { StoryFn } from '@storybook/react'
import { useReducer } from 'react'
import { ExpandableCard } from '..'
import { Button, Stack } from '../..'

export const Controlled: StoryFn<typeof ExpandableCard> = args => {
  const [expanded, onToggleExpanded] = useReducer(
    prevState => !prevState,
    false,
  )

  return (
    <Stack gap={1}>
      <Button onClick={onToggleExpanded}>
        Click me to {expanded ? 'collapse' : 'expanded'} the card
      </Button>
      <ExpandableCard
        {...args}
        header="Controlled"
        expanded={expanded}
        onToggleExpanded={onToggleExpanded}
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
