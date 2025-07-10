import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const Error: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <SelectableCardGroupField {...args} error="This is an error">
    <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
    <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />
  </SelectableCardGroupField>
)

Error.args = {
  name: 'mySelectableCardGroup',
  legend: 'Legend label',
  columns: 2,
}
