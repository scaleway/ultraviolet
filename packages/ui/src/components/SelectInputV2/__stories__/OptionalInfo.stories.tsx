import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { OptionalInfo, OptionalInfo2 } from './resources'

export const AdditionalInfo: StoryFn<typeof SelectInputV2> = args => (
  <>
    <SelectInputV2 {...args} options={OptionalInfo} />
    <SelectInputV2 {...args} options={OptionalInfo2} />
  </>
)

AdditionalInfo.args = {
  name: 'example',
  label: 'Label',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
  width: 400,
  direction: 'row',
}
