import type { StoryFn } from '@storybook/react'
import { Menu } from '..'
import { Modal } from '../../Modal'
import { TextInput } from '../../TextInput'
import { DefaultDisclosure } from './Template.stories'

const NestedModal = () => (
  <Modal disclosure={<Menu.Item>MenuItem with Modal</Menu.Item>}>
    <div style={{ padding: 32 }}>
      Content should be present in center of the modal
    </div>
    <div style={{ padding: 32 }}>
      Content should be present in center of the modal
    </div>
    <TextInput name="test" label="Test input events" />
  </Modal>
)

export const WithModal: StoryFn<typeof Menu> = () => (
  <Menu disclosure={DefaultDisclosure}>
    <Menu.Item>Menu Item</Menu.Item>
    <Menu.Item href="/?path=/docs/components-navigation-menu--modal">
      Menu Item Link
    </Menu.Item>
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
