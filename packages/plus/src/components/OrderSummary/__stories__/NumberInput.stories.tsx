import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OrderSummary } from '..'

const mockItems = (
  requestsAmount: number,
  setRequestsAmount: (value: number | null) => void,
  requestsAmount2: number,
  setRequestsAmount2: (value: number | null) => void,
) => {
  const categoryNumberOfRequests = {
    category: 'Numers of requests',
    numberInput: true,
    numberInputValue: requestsAmount,
    onChangeInput: setRequestsAmount,
  }
  const categoryRequests = {
    category: 'Requests cost',
    subCategories: [
      {
        title: `${requestsAmount} requests`,
        price: 0.00000015,
        amount: requestsAmount,
        priceUnit: 'request',
        fixedPrice: true,
      },
    ],
  }

  const categoryDuration = {
    category: 'Duration',
    subCategories: [
      {
        title: 'Choose a duration',
        numberInput: true,
        numberInputValue: requestsAmount2,
        onChangeInput: setRequestsAmount2,
        hidePrice: true,
        numberInputControls: false,
        numberInputUnit: 'ms',
      },
      {
        title: `Duration: ${requestsAmount2}ms`,
        price: 100,
        amount: requestsAmount2,
        fixePrice: true,
      },
    ],
  }

  return [categoryNumberOfRequests, categoryRequests, categoryDuration]
}

export const NumberInput: StoryFn<ComponentProps<typeof OrderSummary>> = () => {
  const [requestsAmount, setRequestsAmount] = useState<number>(200000)
  const [requestsAmount2, setRequestsAmount2] = useState<number>(10)

  const onChange = (value: number | null) => {
    setRequestsAmount(value ?? 0)
  }

  const onChange2 = (value: number | null) => {
    setRequestsAmount2(value ?? 0)
  }

  return (
    <OrderSummary
      items={mockItems(requestsAmount, onChange, requestsAmount2, onChange2)}
      currency="EUR"
      localeFormat="en-US"
    />
  )
}

NumberInput.parameters = {
  docs: {
    description: {
      story:
        'Instead of displaying the price of the category, it is possible to add a number input to choose quantities/amount using prop `numberInput` and `onChangeInput`, for both categories and subcategories',
    },
  },
}
