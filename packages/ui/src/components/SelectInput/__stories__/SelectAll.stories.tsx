import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped } from './resources'

export const SelectAll: StoryFn<typeof SelectInput> = args => (
  <Stack gap={5} width="50%">
    <SelectInput
      {...args}
      selectAll={{
        label: 'Select All',
        description:
          'You can click here to select every option. This description is optional',
      }}
      label="SelectAll"
    />
    <SelectInput {...args} selectAllGroup label="SelectAllGroup" />
    <SelectInput
      {...args}
      selectAllGroup
      label="SelectAllGroup & SelectAll"
      selectAll={{
        label: 'Select All',
      }}
    />
  </Stack>
)

SelectAll.args = {
  options: dataGrouped,
  multiselect: true,
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
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
