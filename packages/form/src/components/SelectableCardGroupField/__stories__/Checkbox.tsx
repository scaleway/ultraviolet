import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const Checkbox: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <SelectableCardGroupField {...args} type="checkbox">
    <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
    <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />
  </SelectableCardGroupField>
)

Checkbox.args = {
  name: 'mySelectableCardGroup',
  legend: 'Checkbox',
  showTick: true,
}
