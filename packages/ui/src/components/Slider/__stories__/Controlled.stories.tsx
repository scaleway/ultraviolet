import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Controlled: StoryFn<typeof Slider> = () => {
  const [value, setValue] = useState(0)

  return (
    <Stack gap={2}>
      <Slider
        value={value}
        onChange={setValue}
        label="Controlled"
        name="name"
        input
      />
      <Button onClick={() => setValue(0)}>Reset values</Button>
      <Text as="p" variant="body">
        Value selected : {value}
      </Text>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story: 'It can work controlled or uncontrolled',
    },
  },
}
