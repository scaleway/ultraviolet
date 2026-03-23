import { SelectInput } from '..'
import { Stack } from '../../Stack'

import { dataGrouped } from './resources'

import type { StoryFn } from '@storybook/react-vite'

export const DropdownAlign: StoryFn<typeof SelectInput> = args => (
  <Stack alignItems="center">
    <Stack gap={5} width="10%">
      <SelectInput {...args} label="Align start (default)" />
      <SelectInput {...args} dropdownAlign="center" label="Align center" />
    </Stack>
  </Stack>
)

DropdownAlign.args = {
  disabled: false,
  name: 'example',
  options: dataGrouped,
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
}
DropdownAlign.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
