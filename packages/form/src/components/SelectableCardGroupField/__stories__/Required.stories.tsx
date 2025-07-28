import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../..'
import { SelectableCardGroupField } from '..'

export const Required: StoryFn<
  ComponentProps<typeof SelectableCardGroupField>
> = args => (
  <Stack gap={1}>
    <SelectableCardGroupField {...args}>
      <SelectableCardGroupField.Card value="checkbox-1" label="Checkbox 1" />
      <SelectableCardGroupField.Card value="checkbox-2" label="Checkbox 2" />
      <SelectableCardGroupField.Card value="checkbox-3" label="Checkbox 3" />
      <SelectableCardGroupField.Card value="checkbox-4" label="Checkbox 4" />
    </SelectableCardGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'mySelectableCardGroup',
  legend: 'Checkbox',
  showTick: true,
  required: true,
  type: 'checkbox',
  columns: 2,
}
