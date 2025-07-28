import type { StoryFn } from '@storybook/react-vite'
import { SelectInput } from '..'
import { dataGrouped } from './resources'

export const DropdownPortalTarget: StoryFn<typeof SelectInput> = args => (
  <SelectInput
    {...args}
    label="Portal target: document.body"
    portalTarget={document.body}
  />
)

DropdownPortalTarget.args = {
  disabled: false,
  name: 'example',
  options: dataGrouped,
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
}

DropdownPortalTarget.parameters = {
  docs: {
    description: {
      story:
        "In some cases, when the space is limited, you will need to change the `portalTarget` of the dropdown for a higher parent element. If you don't know which element to target, you can use `document.body`.",
    },
  },
}
