import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { RadioGroupField } from '..'
import { Submit } from '../..'

export const RequiredStory: StoryFn<typeof RadioGroupField> = args => (
  <Stack gap={1}>
    <RadioGroupField {...args}>
      <RadioGroupField.Radio name="radio-1" value="radio-1" label="Radio 1" />
      <RadioGroupField.Radio name="radio-2" value="radio-2" label="Radio 2" />
    </RadioGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

export const Required: StoryFn<typeof RadioGroupField> = args => (
  <RequiredStory {...args} />
)

Required.args = {
  name: 'required',
  legend: 'Legend label',
  required: true,
}
