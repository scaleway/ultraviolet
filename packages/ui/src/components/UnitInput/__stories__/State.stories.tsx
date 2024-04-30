import type { StoryFn } from '@storybook/react'
import { UnitInput } from '..'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'

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
export const States: StoryFn<typeof UnitInput> = () => (
  <Stack gap={2}>
    <UnitInput
      options={optionsSelect}
      success="success"
      label="Success"
      name="Success"
    />
    <UnitInput
      options={optionsSelect}
      error="error"
      label="Error"
      name="Error"
    />
  </Stack>
)

States.args = {
  ...Template.args,
}
