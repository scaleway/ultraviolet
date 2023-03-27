import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { NumberInput } from '..'
import { Button, Stack } from '../..'

export const Controlled: ComponentStory<typeof NumberInput> = () => {
  const min = 10
  const max = 100
  const [value, setState] = useState(20)

  return (
    <Stack gap={2}>
      <Button onClick={() => setState(min)}>Set to min ({min})</Button>
      <Button onClick={() => setState(50)}>Set to 50</Button>
      <Button onClick={() => setState(max)}>Set to max ({max})</Button>

      <NumberInput
        minValue={min}
        maxValue={max}
        value={value}
        onChange={val => setState(val)}
      />
    </Stack>
  )
}
