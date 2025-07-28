import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped } from './resources'

export const DropdownAlign: StoryFn<typeof SelectInput> = args => (
  <Stack alignItems="center">
    <Stack gap={5} width="10%">
      <SelectInput {...args} label="Align start (default)" />
      <SelectInput {...args} label="Align center" dropdownAlign="center" />
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
