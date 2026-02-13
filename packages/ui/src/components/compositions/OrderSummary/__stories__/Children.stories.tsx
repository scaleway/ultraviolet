import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OrderSummary } from '..'
import { categoryAZ, categoryM2, categoryOptions } from './productsExample'
import { Stack } from '../../../Stack'
import { Badge } from '../../../Badge'
import { RadioGroup } from '../../../RadioGroup'
import { SelectInput } from '../../../SelectInput'

const mockItems = [categoryAZ, categoryM2, categoryOptions]

const selectInputOptions = [
  {
    label: (
      <Stack direction="row" gap={1}>
        Monthly <Badge sentiment="success">Save 7%</Badge>
      </Stack>
    ),
    searchText: 'monthly',
    value: 'monthly',
  },
  {
    label: (
      <Stack direction="row" gap={1}>
        Yearly <Badge sentiment="success">Save 10%</Badge>
      </Stack>
    ),
    searchText: 'yearly',
    value: 'yearly',
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
        legend="Commitment terms"
        name="commitment"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCommitment(event.target.value === 'false' ? 'false' : 'true')
          if (event.target.value === 'false') {
            setDiscount(0)
          } else {
            setDiscount(commitmentChoice === 'monthly' ? 0.07 : 0.1)
          }
        }}
        value={commitment}
      >
        <RadioGroup.Radio label="No commitment" value="false" />
        <RadioGroup.Radio label="Commitment" value="true" />
      </RadioGroup>
      <SelectInput
        disabled={commitment === 'false'}
        name="commitment"
        onChange={onChangeCommitment}
        options={selectInputOptions}
        size="medium"
        value={commitmentChoice}
      />
    </OrderSummary>
  )
}

Children.args = {
  header: 'Summary',
  items: mockItems,
}

Children.parameters = {
  docs: {
    description: {
      story:
        'The `children` prop can be used to add information in the non-scrollable area, before the final price.',
    },
  },
}
