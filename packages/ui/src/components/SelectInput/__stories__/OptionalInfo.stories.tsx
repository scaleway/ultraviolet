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
      label="Bigger badge - right"
      optionalInfoPlacement="right"
      options={OptionalInfo}
    />
    <SelectInput
      {...args}
      label="Right"
      optionalInfoPlacement="right"
      options={OptionalInfo2}
    />
    <SelectInput
      {...args}
      label="Left"
      optionalInfoPlacement="left"
      options={OptionalInfo3}
    />
    <SelectInput
      {...args}
      label="Right"
      optionalInfoPlacement="right"
      options={OptionalInfo4}
    />
    <SelectInput
      {...args}
      label="With option disabled and button"
      optionalInfoPlacement="right"
      options={OptionalInfo5}
    />
  </Stack>
)

AdditionalInfo.args = {
  disabled: false,
  helper: 'helper',
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
}

AdditionalInfo.parameters = {
  docs: {
    description: {
      story:
        'It is possible to specify "additional information" to options individually. This additional information if optional  and will no be shown when the option is selected. It is possible to globally choose its position in the dropdown (left or right of the label) with the prop `OptionalInfoPlacemnet`.',
    },
  },
}
