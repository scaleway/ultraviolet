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
      <SelectableCardGroupField.Card label="Checkbox 1" value="checkbox-1" />
      <SelectableCardGroupField.Card label="Checkbox 2" value="checkbox-2" />
      <SelectableCardGroupField.Card label="Checkbox 3" value="checkbox-3" />
      <SelectableCardGroupField.Card label="Checkbox 4" value="checkbox-4" />
    </SelectableCardGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  columns: 2,
  legend: 'Checkbox',
  name: 'mySelectableCardGroup',
  required: true,
  showTick: true,
  type: 'checkbox',
}
