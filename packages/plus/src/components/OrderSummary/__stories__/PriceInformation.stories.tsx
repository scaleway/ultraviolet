import type { StoryFn } from '@storybook/react-vite'
import { Badge, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { OrderSummary } from '..'
import { categoryAZ, categoryDefault } from './productsExample'

const elements = [categoryAZ, categoryDefault]
export const PriceInformation: StoryFn<
  ComponentProps<typeof OrderSummary>
> = () => (
  <Stack direction="column" gap={3}>
    <Text as="p" variant="body">
      Price information ={' '}
      <Text as="span" variant="code">
        true
      </Text>{' '}
      :
    </Text>
    <OrderSummary
      currency="EUR"
      header="Summary"
      items={elements}
      localeFormat="en-US"
      priceInformation
    />
    <Text as="p" variant="body">
      Price information ={' '}
      <Text as="span" variant="code">
        [ReactNode]
      </Text>{' '}
      :
    </Text>
    <OrderSummary
      currency="EUR"
      discount={1}
      header="Summary"
      items={elements}
      localeFormat="en-US"
      priceInformation={
        <Badge prominence="strong" sentiment="warning">
          free
        </Badge>
      }
    />
    <Text as="p" variant="body">
      Price information ={' '}
      <Text as="span" variant="code">
        true
      </Text>{' '}
      : and hideDetaiils={' '}
      <Text as="span" variant="code">
        true
      </Text>{' '}
    </Text>
    <OrderSummary
      currency="EUR"
      header="Summary"
      hideDetails
      items={elements}
      localeFormat="en-US"
      priceInformation
    />
    <Text as="p" variant="body">
      Price information ={' '}
      <Text as="span" variant="code">
        [ReactNode]
      </Text>{' '}
      : and hideDetails={' '}
      <Text as="span" variant="code">
        true
      </Text>{' '}
    </Text>
    <OrderSummary
      currency="EUR"
      header="Summary"
      hideDetails
      items={elements}
      localeFormat="en-US"
      priceInformation={
        <Badge prominence="strong" sentiment="warning">
          not free
        </Badge>
      }
    />
    <Text as="p" variant="body">
      Price information ={' '}
      <Text as="span" variant="code">
        false
      </Text>{' '}
      : and hideDetails={' '}
      <Text as="span" variant="code">
        true
      </Text>{' '}
    </Text>
    <OrderSummary
      currency="EUR"
      header="Summary"
      hideDetails
      items={elements}
      localeFormat="en-US"
      priceInformation={false}
    />
  </Stack>
)

PriceInformation.parameters = {
  docs: {
    description: {
      story:
        'Using the `priceInformation` prop to display additional information next to the total price. When set to `true`, it shows `/unit` where unit is the currently selected unit. When `hideDetails` is true, by default `/unit` is displayed by default, but you can provide a custom `priceInformation` value to override this behavior.',
    },
  },
}
