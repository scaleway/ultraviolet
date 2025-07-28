import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const Template: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <SelectableCardGroupField {...args}>
    <SelectableCardGroupField.Card label="Radio 1" value="radio 1" />
    <SelectableCardGroupField.Card label="Radio 2" value="radio 2" />
  </SelectableCardGroupField>
)

Template.args = {
  legend: 'Legend label',
  name: 'mySelectableCardGroup',
  showTick: true,
}
