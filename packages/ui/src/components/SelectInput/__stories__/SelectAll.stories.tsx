import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped } from './resources'

export const SelectAll: StoryFn<typeof SelectInput> = args => (
  <Stack gap={5} width="50%">
    <SelectInput
      {...args}
      label="SelectAll"
      selectAll={{
        description:
          'You can click here to select every option. This description is optional',
        label: 'Select All',
      }}
    />
    <SelectInput {...args} label="SelectAllGroup" selectAllGroup />
    <SelectInput
      {...args}
      label="SelectAllGroup & SelectAll"
      selectAll={{
        label: 'Select All',
      }}
      selectAllGroup
    />
  </Stack>
)

SelectAll.args = {
  disabled: false,
  helper: 'helper',
  multiselect: true,
  name: 'example',
  options: dataGrouped,
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
}
SelectAll.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

SelectAll.parameters = {
  docs: {
    description: {
      story:
        'It will detect when the data is grouped and display the options accordingly',
    },
  },
}
