import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { EstimateCost } from '..'
import { Stack } from '../../../Stack'
import { Button } from '../../../Button'

export const Unit: StoryFn<ComponentProps<typeof EstimateCost>> = props => {
  const [value, setValue] = useState<number | undefined>(0)

  return (
    <Stack gap={1}>
      <Button onClick={() => setValue(10)}>Set value to 10</Button>
      <Button onClick={() => setValue(20)}>Set value to 20</Button>
      <EstimateCost {...props} hideOverlay>
        <EstimateCost.Item
          amount={value}
          label="Screen pixels"
          price={1}
          unit="Px"
        >
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>
    </Stack>
  )
}

Unit.parameters = {
  docs: {
    description: {
      story:
        'Item unit is an interactive input. It allows customers to change the value to see how much it will cost. <br/>' +
        'The component `EstimateCost.Item` include a prop called `amountFree` as number. This number is deducted to NumberInput ' +
        'value (check example with 50 GB Free).' +
        '<br/><br/>' +
        'You can get value of the amount set in NumberInput by using `getAmountValue` prop.',
    },
  },
}
