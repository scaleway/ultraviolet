import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { UnitInputField } from '..'
import { Submit } from '../..'

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

export const Template: StoryFn<
  ComponentProps<typeof UnitInputField>
> = args => (
  <Stack gap="1">
    <UnitInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  label: 'Label',
  name: 'example',
  options: optionsSelect,
  helper: 'helper',
  placeholder: 'Placeholder',
}
