import type { StoryFn } from '@storybook/react'
import { CancelIcon, CheckIcon, PencilIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const Active: StoryFn = args => {
  const [active, setActive] = useState(true)

  return (
    <Card {...args} header="Active Card" active={active}>
      <Stack gap={6} direction="row" justifyContent="space-between">
        <Text as="p" variant="body" sentiment={active ? 'primary' : 'neutral'}>
          This card is currently highlighted through <strong>active</strong>{' '}
          prop. In this example we use it to show the content is being edited.
        </Text>

        {active ? (
          <Stack gap={1} direction="row">
            <Button
              variant="outlined"
              sentiment="success"
              onClick={() => setActive(false)}
            >
              <CheckIcon />
            </Button>
            <Button
              variant="outlined"
              sentiment="danger"
              onClick={() => setActive(false)}
            >
              <CancelIcon />
            </Button>
          </Stack>
        ) : (
          <Button sentiment="neutral" onClick={() => setActive(true)}>
            <PencilIcon />
          </Button>
        )}
      </Stack>
    </Card>
  )
}

Active.parameters = {
  docs: {
    description: {
      story: 'You can highlight a Card by passing the `active` prop.',
    },
  },
}
