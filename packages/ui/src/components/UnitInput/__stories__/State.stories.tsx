import { UnitInput } from '..'
import { Stack } from '../../Stack'

import { Template } from './Template.stories'

import type { StoryFn } from '@storybook/react-vite'

const optionsSelect = [
  {
    label: 'Seconds',
    value: 'seconds',
  },
  {
    label: 'Days',
    value: 'days',
  },
  {
    label: 'Months',
    value: 'months',
  },
]
export const States: StoryFn<typeof UnitInput> = props => (
  <Stack gap={2}>
    <UnitInput
      {...props}
      label="Success"
      name="Success"
      options={optionsSelect}
      success="success"
    />
    <UnitInput
      {...props}
      error="error"
      label="Error"
      name="Error"
      options={optionsSelect}
    />
  </Stack>
)

States.args = {
  ...Template.args,
}
