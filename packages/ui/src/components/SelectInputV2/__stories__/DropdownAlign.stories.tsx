import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Stack } from '../../Stack'
import { dataGrouped } from './resources'

export const DropdownAlign: StoryFn<typeof SelectInputV2> = args => (
  <Stack alignItems="center">
    <Stack gap={5} width="10%">
      <SelectInputV2 {...args} label="Align start (default)" />
      <SelectInputV2 {...args} label="Align center" dropdownAlign="center" />
    </Stack>
  </Stack>
)

DropdownAlign.args = {
  options: dataGrouped,
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  disabled: false,
}
DropdownAlign.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
