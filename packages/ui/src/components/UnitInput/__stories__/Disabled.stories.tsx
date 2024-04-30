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
export const Disabled: StoryFn<typeof UnitInput> = () => (
  <Stack gap={2}>
    <UnitInput
      options={optionsSelect}
      disabled
      label="Disabled"
      name="Disabled"
      placeholder="I am disabled"
      placeholderUnit="Cannot select"
    />
    <UnitInput
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
