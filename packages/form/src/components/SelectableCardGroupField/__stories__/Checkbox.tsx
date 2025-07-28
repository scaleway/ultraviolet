import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const Checkbox: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <SelectableCardGroupField {...args} type="checkbox">
    <SelectableCardGroupField.Card label="Radio 1" value="radio 1" />
    <SelectableCardGroupField.Card label="Radio 2" value="radio 2" />
  </SelectableCardGroupField>
)

Checkbox.args = {
  legend: 'Checkbox',
  name: 'mySelectableCardGroup',
  showTick: true,
}
