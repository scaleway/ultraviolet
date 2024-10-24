import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Button } from '../../Button'
import { Modal as ModalComponent } from '../../Modal'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { dataGrouped } from './resources'

export const Modal: StoryFn<typeof SelectInputV2> = args => (
  <ModalComponent
    disclosure={<Button type="button">Modal</Button>}
    placement="bottom"
  >
    <Stack gap={2}>
      <Text as="h1" variant="heading" sentiment="neutral">
        Title
      </Text>
      <Text as="p" variant="body" sentiment="neutral">
        This is an example of SelectInput inside a modal.
      </Text>
      <SelectInputV2 {...args} label="Label" />
      <Text as="p" variant="body" sentiment="neutral">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </Stack>
  </ModalComponent>
)

Modal.args = {
  options: dataGrouped,
  multiselect: true,
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
}
Modal.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Modal.parameters = {
  docs: {
    description: {
      story:
        'The component will trigger an automatic scroll when it is located at the bottom of the screen',
    },
  },
}
