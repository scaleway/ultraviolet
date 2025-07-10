import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { RadioGroupField } from '..'
import { Submit } from '../..'

const RequiredTemplate = (args: ComponentProps<typeof RadioGroupField>) => (
  <Stack gap={1}>
    <RadioGroupField {...args}>
      <RadioGroupField.Radio value="radio-1" label="Radio 1" />
      <RadioGroupField.Radio value="radio-2" label="Radio 2" />
    </RadioGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

export const Required: StoryFn<typeof RadioGroupField> = args => (
  <RequiredTemplate {...args} />
)

Required.args = {
  name: 'required',
  legend: 'Legend label',
  required: true,
}
