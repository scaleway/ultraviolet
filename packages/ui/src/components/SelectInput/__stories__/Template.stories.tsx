import type { StoryFn } from '@storybook/react-vite'
import { SelectInput } from '..'
import { Stack } from '../../Stack'

export const Template: StoryFn<typeof SelectInput> = args => (
  <Stack width="80%">
    <SelectInput {...args} />
  </Stack>
)

Template.args = {
  name: 'example',
  label: 'Label',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
}
