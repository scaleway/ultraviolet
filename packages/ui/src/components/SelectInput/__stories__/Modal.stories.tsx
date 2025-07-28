import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal as ModalComponent } from '../../Modal'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectInput } from '..'
import { dataGrouped } from './resources'

export const Modal: StoryFn<typeof SelectInput> = args => (
  <ModalComponent
    disclosure={<Button type="button">Modal</Button>}
    placement="bottom"
  >
    <Stack gap={2}>
      <Text as="h1" sentiment="neutral" variant="heading">
        Title
      </Text>
      <Text as="p" sentiment="neutral" variant="body">
        This is an example of SelectInput inside a modal.
      </Text>
      <SelectInput {...args} label="Label" />
      <Text as="p" sentiment="neutral" variant="body">
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
  disabled: false,
  helper: 'helper',
  multiselect: true,
  name: 'example',
  options: dataGrouped,
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
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
