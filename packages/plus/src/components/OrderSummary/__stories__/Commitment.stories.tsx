import type { StoryFn } from '@storybook/react'
import { Badge, Stack } from '@ultraviolet/ui'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { OrderSummary } from '..'
import { categoryAZ, categoryM2, categoryOptions } from './prodcutsExample'

const mockItems = [categoryAZ, categoryM2, categoryOptions]

export const commitmentOptions = [
  {
    discount: 0.97,
    label: (
      <Stack direction="row" gap={1}>
        Monthly <Badge sentiment="success">Save 7%</Badge>
      </Stack>
    ),
  },
  {
    discount: 0.9,
    label: (
      <Stack direction="row" gap={1}>
        Yearly <Badge sentiment="success">Save 10%</Badge>
      </Stack>
    ),
  },
]

export const Commitment: StoryFn<
  ComponentProps<typeof OrderSummary>
> = props => {
  const [commitmentChoice, setCommitment] = useState<'false' | number>('false')

  const onChangeCommitment = (value: string) => {
    setCommitment(value === 'false' ? value : Number.parseFloat(value))
  }

  return (
    <OrderSummary
      {...props}
      commitment
      commitmentOptions={commitmentOptions}
      onChangeCommitment={onChangeCommitment}
      commitmentChoice={commitmentChoice}
    />
  )
}

Commitment.args = {
  items: mockItems,
}
