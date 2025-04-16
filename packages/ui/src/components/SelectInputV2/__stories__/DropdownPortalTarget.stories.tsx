import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { dataGrouped } from './resources'

export const DropdownPortalTarget: StoryFn<typeof SelectInputV2> = args => (
  <SelectInputV2
    {...args}
    label="Portal target: document.body"
    portalTarget={document.body}
  />
)

DropdownPortalTarget.args = {
  options: dataGrouped,
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  disabled: false,
}

DropdownPortalTarget.parameters = {
  docs: {
    description: {
      story:
        "In some cases, when the space is limited, you will need to change the `portalTarget` of the dropdown for a higher parent element. If you don't know which element to target, you can use `document.body`.",
    },
  },
}
