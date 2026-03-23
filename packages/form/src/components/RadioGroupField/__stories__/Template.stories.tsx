import { RadioGroupField } from '../..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof RadioGroupField>
> = args => (
  <RadioGroupField {...args}>
    <RadioGroupField.Radio label="Radio 1" value="radio 1" />
    <RadioGroupField.Radio label="Radio 2" value="radio 2" />
  </RadioGroupField>
)

Template.args = {
  legend: 'Legend label',
  name: 'myRadioGroup',
}
