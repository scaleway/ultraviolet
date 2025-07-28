import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardGroupField } from '../..'

export const Error: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <SelectableCardGroupField {...args} error="This is an error">
    <SelectableCardGroupField.Card label="Radio 1" value="radio 1" />
    <SelectableCardGroupField.Card label="Radio 2" value="radio 2" />
  </SelectableCardGroupField>
)

Error.args = {
  columns: 2,
  legend: 'Legend label',
  name: 'mySelectableCardGroup',
}
