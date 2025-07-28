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
export const Disabled: StoryFn<typeof UnitInput> = props => (
  <Stack gap={2}>
    <UnitInput
      {...props}
      disabled
      label="Disabled"
      name="Disabled"
      options={optionsSelect}
      placeholder="I am disabled"
      placeholderUnit="Cannot select"
    />
    <UnitInput
      {...props}
      label="ReadOnly"
      name="ReadOnly"
      options={optionsSelect}
      placeholder="I am readOnly"
      placeholderUnit="Cannot select"
      readOnly
    />
  </Stack>
)

Disabled.args = {
  ...Template.args,
}
