import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { RadioGroupField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof RadioGroupField>
> = args => (
  <RadioGroupField {...args}>
    <RadioGroupField.Radio name="radio-1" value="radio-1" label="Radio 1" />
    <RadioGroupField.Radio name="radio-2" value="radio-2" label="Radio 2" />
  </RadioGroupField>
)

Template.args = {
  name: 'template',
  label: 'Legend label',
}
