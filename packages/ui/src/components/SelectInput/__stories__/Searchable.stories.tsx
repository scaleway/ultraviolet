import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { OptionalInfo, OptionalInfo2 } from './resources'

export const Searchable: StoryFn<typeof SelectInput> = args => (
  <Stack gap="2" width="50%">
    <SelectInput
      {...args}
      label="Searchable true : >= 6 elements"
      options={OptionalInfo}
      searchable
    />
    <SelectInput
      {...args}
      label="Searchable true : <6 elements"
      optionalInfoPlacement="right"
      options={OptionalInfo2}
      searchable
    />
  </Stack>
)

Searchable.args = {
  disabled: false,
  helper: 'helper',
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
}

Searchable.parameters = {
  docs: {
    description: {
      story:
        'Add a search bar in the dropdown to search through the different options. If there are less than 6 options, the search bar will **not** appear, even if the prop is set to `true`.',
    },
  },
}
