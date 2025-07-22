import type { StoryFn } from '@storybook/react-vite'
import { Button, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OrderSummary } from '..'
import type { PriceType } from '../types'
import { categoryAZ, categoryDefault } from './productsExample'

export const OnChange: StoryFn<ComponentProps<typeof OrderSummary>> = () => {
  const [prices, setPrices] = useState<PriceType>({})
  const [elements, setElements] = useState([categoryAZ, categoryDefault])

  const onClick = () =>
    elements.length === 2
      ? setElements([categoryDefault])
      : setElements([categoryAZ, categoryDefault])

  return (
    <Stack direction="row" gap={3}>
      <Button onClick={onClick}>Change elements</Button>
      <OrderSummary
        items={elements}
        currency="EUR"
        localeFormat="en-US"
        onChange={setPrices}
        header="Summary"
      />
      <ul>
        Prices:
        {prices
          ? Object.keys(prices).map(category => (
              <li key={category}>
                {category}: {prices?.[category].totalPriceWithDiscount ?? 0}€
              </li>
            ))
          : null}
      </ul>
    </Stack>
  )
}

OnChange.parameters = {
  docs: {
    description: {
      story:
        'Using prop `onChange` it is possible to get the price of each category',
    },
  },
}
