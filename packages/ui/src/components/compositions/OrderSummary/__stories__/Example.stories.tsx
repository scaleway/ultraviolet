import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps, Dispatch } from 'react'
import { useState } from 'react'
import { OrderSummary } from '..'
import {
  categoryM2,
  categoryOptions,
  categoryStorage,
  negativeItem,
} from './productsExample'
import { Stack } from '../../../Stack'
import { Checkbox } from '../../../Checkbox'
import { Button } from '../../../Button'
import { Text } from '../../../Text'
import { Link } from '../../../Link'

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
        amount: requestsAmount ?? 0,
        fixedPrice: true,
        price: 0.000_000_15,
        priceUnit: 'request',
        title: `${requestsAmount} requests`,
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
  const [requestsAmount, setRequestsAmount] = useState<number | null>(200_000)

  return (
    <OrderSummary
      currency="EUR"
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
            prominence="weak"
            sentiment="neutral"
            variant="bodySmall"
          >
            *For this estimation, 1 month is considered 730 hours.&nbsp;
            <Link href="#" size="small" target="_blank">
              Understand Apple Silicon billing
            </Link>
          </Text>
        </Stack>
      }
      header="Summary"
      items={mockItems(requestsAmount, setRequestsAmount)}
      localeFormat="en-US"
      unitUnitInput="hours"
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
