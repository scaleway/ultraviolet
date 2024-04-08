import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import {
  OptionalInfo,
  OptionalInfo2,
  OptionalInfo3,
  OptionalInfo4,
} from './resources'

export const AdditionalInfo: StoryFn<typeof SelectInputV2> = args => (
  <>
    <SelectInputV2
      {...args}
      options={OptionalInfo}
      label="Bigger badge - left"
      optionalInfoPlacement="right"
    />
    <SelectInputV2
      {...args}
      options={OptionalInfo2}
      optionalInfoPlacement="right"
      label="Right"
    />
    <SelectInputV2
      {...args}
      options={OptionalInfo3}
      optionalInfoPlacement="left"
      label="Left"
    />
    <SelectInputV2
      {...args}
      options={OptionalInfo4}
      optionalInfoPlacement="right"
      label="Left"
    />
  </>
)

AdditionalInfo.args = {
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
  disabled: false,
  helper: 'helper',
  width: 400,
}

AdditionalInfo.parameters = {
  docs: {
    description: {
      story:
        'It is possible to specify "additional information" to options individually. This additional information if optional  and will no be shown when the option is selected. It is possible to globally choose its position in the dropdown (left or right of the label) with the prop `OptionalInfoPlacemnet`.',
    },
  },
}
