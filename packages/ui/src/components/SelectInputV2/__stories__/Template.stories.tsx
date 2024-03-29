import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'

export const Template: StoryFn<typeof SelectInputV2> = args => (
  <SelectInputV2 {...args} />
)

Template.args = {
  name: 'example',
  label: 'Label',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
  width: 500,
}
