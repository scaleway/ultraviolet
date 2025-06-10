import type { StoryFn } from '@storybook/react'
import { SelectInput } from '..'
import { Stack } from '../../Stack'
import { OptionalInfo, OptionalInfo2 } from './resources'

export const Searchable: StoryFn<typeof SelectInput> = args => (
  <Stack gap="2" width="50%">
    <SelectInput
      {...args}
      options={OptionalInfo}
      label="Searchable true : >= 6 elements"
      searchable
    />
    <SelectInput
      {...args}
      options={OptionalInfo2}
      optionalInfoPlacement="right"
      label="Searchable true : <6 elements"
      searchable
    />
  </Stack>
)

Searchable.args = {
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
  disabled: false,
  helper: 'helper',
}

Searchable.parameters = {
  docs: {
    description: {
      story:
        'Add a search bar in the dropdown to search through the different options. If there are less than 6 options, the search bar will **not** appear, even if the prop is set to `true`.',
    },
  },
}
