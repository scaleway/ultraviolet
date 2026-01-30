import type { StoryFn } from '@storybook/react-vite'
import { CancelIcon } from '@ultraviolet/icons/CancelIcon'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const Active: StoryFn = args => {
  const [active, setActive] = useState(true)

  return (
    <Card {...args} active={active} header="Active Card">
      <Stack direction="row" gap={6} justifyContent="space-between">
        <Text as="p" sentiment={active ? 'primary' : 'neutral'} variant="body">
          This card is currently highlighted through <strong>active</strong>{' '}
          prop. In this example we use it to show the content is being edited.
        </Text>

        {active ? (
          <Stack direction="row" gap={1}>
            <Button
              onClick={() => setActive(false)}
              sentiment="success"
              variant="outlined"
            >
              <CheckIcon />
            </Button>
            <Button
              onClick={() => setActive(false)}
              sentiment="danger"
              variant="outlined"
            >
              <CancelIcon />
            </Button>
          </Stack>
        ) : (
          <Button onClick={() => setActive(true)} sentiment="neutral">
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
