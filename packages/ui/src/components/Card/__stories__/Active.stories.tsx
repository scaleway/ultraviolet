import type { StoryFn } from '@storybook/react'
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
          This card is currently highlighted through isActive prop. In this
          example we use it to show the content is being edited.
        </Text>

        {active ? (
          <Stack gap={1} direction="row">
            <Button
              variant="outlined"
              sentiment="success"
              icon="check"
              onClick={() => setActive(false)}
            />
            <Button
              variant="outlined"
              sentiment="danger"
              icon="cancel"
              onClick={() => setActive(false)}
            />
          </Stack>
        ) : (
          <Button
            sentiment="neutral"
            icon="pencil"
            onClick={() => setActive(true)}
          />
        )}
      </Stack>
    </Card>
  )
}

Active.parameters = {
  docs: {
    description: {
      story: 'You can highlight a Card by passing the `isActive` prop.',
    },
  },
}
