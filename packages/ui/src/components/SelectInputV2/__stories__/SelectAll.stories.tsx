import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Stack } from '../../Stack'
import { dataGrouped } from './resources'

export const SelectAll: StoryFn<typeof SelectInputV2> = args => (
  <Stack gap={5} width="30%">
    <SelectInputV2
      {...args}
      selectAll={{
        label: 'Select All',
        description:
          'You can click here to select every option. This description is optional',
      }}
      label="SelectAll"
    />
    <SelectInputV2 {...args} selectAllGroup label="SelectAllGroup" />
    <SelectInputV2
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
