import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../..'
import { RadioGroupField } from '..'

const RequiredTemplate = (args: ComponentProps<typeof RadioGroupField>) => (
  <Stack gap={1}>
    <RadioGroupField {...args}>
      <RadioGroupField.Radio label="Radio 1" value="radio-1" />
      <RadioGroupField.Radio label="Radio 2" value="radio-2" />
    </RadioGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

export const Required: StoryFn<typeof RadioGroupField> = args => (
  <RequiredTemplate {...args} />
)

Required.args = {
  legend: 'Legend label',
  name: 'required',
  required: true,
}
