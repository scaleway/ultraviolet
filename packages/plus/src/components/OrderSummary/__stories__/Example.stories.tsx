import type { StoryFn } from '@storybook/react-vite'
import { Button, Checkbox, Link, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, Dispatch } from 'react'
import { useState } from 'react'
import { OrderSummary } from '..'
import {
  categoryM2,
  categoryOptions,
  categoryStorage,
  negativeItem,
} from './productsExample'

const mockItems = (
  requestsAmount: number | null,
  setRequestsAmount: Dispatch<React.SetStateAction<number | null>>,
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
        amount: requestsAmount ?? 0,
        priceUnit: 'request',
        fixedPrice: true,
      },
    ],
  }

  return [
    categoryNumberOfRequests,
    categoryRequests,
    categoryM2,
    categoryOptions,
    categoryStorage,
    negativeItem,
  ]
}

export const Example: StoryFn<ComponentProps<typeof OrderSummary>> = () => {
  const [checked, setChecked] = useState(false)
  const [requestsAmount, setRequestsAmount] = useState<number | null>(200000)

  return (
    <OrderSummary
      unitUnitInput="hours"
      footer={
        <Stack gap="1">
          <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
            I have read and accept Bare Metal specific conditions and macOS
            License Agreement
          </Checkbox>
          <Button disabled={!checked} onClick={() => alert('clicked')}>
            Create
          </Button>
          <Text
            as="span"
            sentiment="neutral"
            variant="bodySmall"
            prominence="weak"
          >
            *For this estimation, 1 month is considered 730 hours.&nbsp;
            <Link href="#" size="small" target="_blank">
              Understand Apple Silicon billing
            </Link>
          </Text>
        </Stack>
      }
      items={mockItems(requestsAmount, setRequestsAmount)}
      currency="EUR"
      localeFormat="en-US"
      header="Summary"
    />
  )
}

Example.parameters = {
  docs: {
    description: {
      story: 'Example with footer and children and custom content.',
    },
  },
}
