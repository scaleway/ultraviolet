import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { UnitInput } from '..'
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
export const States: StoryFn<typeof UnitInput> = props => (
  <Stack gap={2}>
    <UnitInput
      {...props}
      options={optionsSelect}
      success="success"
      label="Success"
      name="Success"
    />
    <UnitInput
      {...props}
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
