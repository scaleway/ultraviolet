import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'

export const Template: StoryFn<typeof SelectInput> = args => (
  <Stack width="80%">
    <SelectInput {...args} />
  </Stack>
)

Template.args = {
  disabled: false,
  label: 'Label',
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
}
