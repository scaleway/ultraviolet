import type { StoryFn } from '@storybook/react-vite'
import { Menu } from '..'
import { SelectInput } from '../../../Data Entry/SelectInput'
import { TextInput } from '../../../Data Entry/TextInput'
import { Stack } from '../../../Layout/Stack'
import { Modal } from '../../Modal'
import { DefaultDisclosure } from './Template.stories'

const OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

const NestedModal = () => (
  <Modal disclosure={<Menu.Item>MenuItem with Modal</Menu.Item>}>
    <Stack gap={2}>
      <TextInput label="Test input events" name="test" />

      <Menu disclosure={DefaultDisclosure} placement="bottom-start">
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
        <Menu.Item>Action 3</Menu.Item>
      </Menu>

      <SelectInput label="Choose an option" name="example" options={OPTIONS} />
    </Stack>
  </Modal>
)

export const WithModal: StoryFn<typeof Menu> = () => (
  <Menu disclosure={DefaultDisclosure}>
    <Menu.Item>Menu Item</Menu.Item>
    <Menu.Item href="/?path=/docs/components-navigation-menu--modal">Menu Item Link</Menu.Item>
    <NestedModal />
  </Menu>
)

WithModal.parameters = {
  docs: {
    description: { story: 'This show how to use a modal on MenuItem.' },
  },
}

WithModal.decorators = [
  StoryComponent => (
    <div style={{ height: '100px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
