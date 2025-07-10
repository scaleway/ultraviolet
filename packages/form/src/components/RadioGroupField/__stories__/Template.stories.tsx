import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { RadioGroupField } from '../..'

export const Template: StoryFn<
  ComponentProps<typeof RadioGroupField>
> = args => (
  <RadioGroupField {...args}>
    <RadioGroupField.Radio value="radio 1" label="Radio 1" />
    <RadioGroupField.Radio value="radio 2" label="Radio 2" />
  </RadioGroupField>
)

Template.args = {
  name: 'myRadioGroup',
  legend: 'Legend label',
}
