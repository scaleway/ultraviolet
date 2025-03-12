import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OrderSummary } from '..'
import { categoryAZ, categoryDefault } from './productsExample'

export const OnChange: StoryFn<ComponentProps<typeof OrderSummary>> = () => {
  const [prices, setPrices] =
    useState<
      Record<
        string,
        {
          before: [number, number]
          after: [number, number]
        }
      >
    >()

  return (
    <>
      <ul>
        Prices:
        {prices
          ? Object.keys(prices).map(category => (
              <li key={category}>
                {category}: {prices?.[category].after[0] ?? 0}€
              </li>
            ))
          : null}
      </ul>
      <OrderSummary
        items={[categoryAZ, categoryDefault]}
        currency="EUR"
        localeFormat="en-US"
        onChange={setPrices}
        header="Summary"
      />
    </>
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
