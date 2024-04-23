import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Stack } from '../../Stack'

export const Template: StoryFn<typeof SelectInputV2> = args => (
  <Stack width="80%">
    <SelectInputV2 {...args} />
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
