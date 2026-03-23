import { Stack } from '@ultraviolet/ui'

import { UnitInputField } from '..'
import { Submit } from '../..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

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
  helper: 'helper',
  label: 'Label',
  name: 'example',
  options: optionsSelect,
  placeholder: 'Placeholder',
}
