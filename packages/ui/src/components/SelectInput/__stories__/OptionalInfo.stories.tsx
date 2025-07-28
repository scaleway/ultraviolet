import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import {
  OptionalInfo,
  OptionalInfo2,
  OptionalInfo3,
  OptionalInfo4,
  OptionalInfo5,
} from './resources'

export const AdditionalInfo: StoryFn<typeof SelectInput> = args => (
  <Stack gap="2" width="50%">
    <SelectInput
      {...args}
      options={OptionalInfo}
      label="Bigger badge - right"
      optionalInfoPlacement="right"
    />
    <SelectInput
      {...args}
      options={OptionalInfo2}
      optionalInfoPlacement="right"
      label="Right"
    />
    <SelectInput
      {...args}
      options={OptionalInfo3}
      optionalInfoPlacement="left"
      label="Left"
    />
    <SelectInput
      {...args}
      options={OptionalInfo4}
      optionalInfoPlacement="right"
      label="Right"
    />
    <SelectInput
      {...args}
      options={OptionalInfo5}
      optionalInfoPlacement="right"
      label="With option disabled and button"
    />
  </Stack>
)

AdditionalInfo.args = {
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
  disabled: false,
  helper: 'helper',
}

AdditionalInfo.parameters = {
  docs: {
    description: {
      story:
        'It is possible to specify "additional information" to options individually. This additional information if optional  and will no be shown when the option is selected. It is possible to globally choose its position in the dropdown (left or right of the label) with the prop `OptionalInfoPlacemnet`.',
    },
  },
}
