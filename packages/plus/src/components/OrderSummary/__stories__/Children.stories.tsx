import type { StoryFn } from '@storybook/react'
import { Badge, RadioGroup, SelectInputV2, Stack } from '@ultraviolet/ui'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { OrderSummary } from '..'
import { categoryAZ, categoryM2, categoryOptions } from './prodcutsExample'

const mockItems = [categoryAZ, categoryM2, categoryOptions]

const selectInputOptions = [
  {
    label: (
      <Stack direction="row" gap={1}>
        Monthly <Badge sentiment="success">Save 7%</Badge>
      </Stack>
    ),
    value: 'monthly',
    searchText: 'monthly',
  },
  {
    label: (
      <Stack direction="row" gap={1}>
        Yearly <Badge sentiment="success">Save 10%</Badge>
      </Stack>
    ),
    value: 'yearly',
    searchText: 'yearly',
  },
]

export const Children: StoryFn<ComponentProps<typeof OrderSummary>> = props => {
  const [commitment, setCommitment] = useState<'false' | 'true'>('false')
  const [commitmentChoice, setCommitmentChoice] = useState('monthly')
  const [discount, setDiscount] = useState(0)

  const onChangeCommitment = (value: string) => {
    if (value === 'monthly') {
      setDiscount(0.07)
      setCommitmentChoice('monthly')
    }
    if (value === 'yearly') {
      setDiscount(0.1)
      setCommitmentChoice('yearly')
    }
  }

  return (
    <OrderSummary {...props} discount={discount}>
      <RadioGroup
        name="commitment"
        value={commitment}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCommitment(event.target.value === 'false' ? 'false' : 'true')
          if (event.target.value === 'false') {
            setDiscount(0)
          } else setDiscount(commitmentChoice === 'monthly' ? 0.07 : 0.1)
        }}
        legend="Commitment terms"
      >
        <RadioGroup.Radio value="false" label="No commitment" />
        <RadioGroup.Radio value="true" label="Commitment" />
      </RadioGroup>
      <SelectInputV2
        options={selectInputOptions}
        name="commitment"
        onChange={onChangeCommitment}
        disabled={commitment === 'false'}
        value={commitmentChoice}
      />
    </OrderSummary>
  )
}

Children.args = {
  items: mockItems,
}
