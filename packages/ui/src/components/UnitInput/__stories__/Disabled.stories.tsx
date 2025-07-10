import type { StoryFn } from '@storybook/react-vite'
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
export const Disabled: StoryFn<typeof UnitInput> = props => (
  <Stack gap={2}>
    <UnitInput
      {...props}
      options={optionsSelect}
      disabled
      label="Disabled"
      name="Disabled"
      placeholder="I am disabled"
      placeholderUnit="Cannot select"
    />
    <UnitInput
      {...props}
      options={optionsSelect}
      readOnly
      label="ReadOnly"
      name="ReadOnly"
      placeholder="I am readOnly"
      placeholderUnit="Cannot select"
    />
  </Stack>
)

Disabled.args = {
  ...Template.args,
}
