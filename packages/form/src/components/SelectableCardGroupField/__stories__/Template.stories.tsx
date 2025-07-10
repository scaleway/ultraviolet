import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const Template: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <SelectableCardGroupField {...args}>
    <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
    <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />
  </SelectableCardGroupField>
)

Template.args = {
  name: 'mySelectableCardGroup',
  legend: 'Legend label',
  showTick: true,
}
