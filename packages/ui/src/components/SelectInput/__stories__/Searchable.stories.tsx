import type { StoryFn } from '@storybook/react-vite'
import { SelectInput } from '..'
import { Stack } from '../../Stack'
import { OptionalInfo, OptionalInfo2 } from './resources'

export const Searchable: StoryFn<typeof SelectInput> = args => (
  <Stack gap="2" width="50%">
    <SelectInput {...args} label="Searchable: >= 6 elements" options={OptionalInfo} />
    <SelectInput {...args} label="Not searchable: <6 elements" optionalInfoPlacement="right" options={OptionalInfo2} />
    <SelectInput
      {...args}
      label="Searchable: addOption enabled"
      optionalInfoPlacement="right"
      options={OptionalInfo2}
      addOption={{ text: 'Add option', onClick: () => null }}
    />
  </Stack>
)

Searchable.args = {
  disabled: false,
  helper: 'helper',
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
}

Searchable.parameters = {
  docs: {
    description: {
      story: `
A search bar appears if there are more than 6 options, or if the \`addOption\` prop 
(see [Add Option story](?path=/story/ui-data-entry-selectinput--add-option&globals=theme:light)) is enabled.
      `.trim(),
    },
  },
}
