import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Modal } from '../../Modal'
import { TextInputV2 } from '../../TextInputV2'
import { DefaultDisclosure } from './Template.stories'

export const WithModal: StoryFn<typeof MenuV2> = () => {
  const NestedModal = () => (
    <Modal disclosure={<MenuV2.Item>MenuItem with Modal</MenuV2.Item>}>
      <div style={{ padding: 32 }}>
        Content should be present in center of the modal
      </div>
      <div style={{ padding: 32 }}>
        Content should be present in center of the modal
      </div>
      <TextInputV2 name="test" label="Test input events" />
    </Modal>
  )

  return (
    <MenuV2 disclosure={DefaultDisclosure}>
      <MenuV2.Item>Menu Item</MenuV2.Item>
      <MenuV2.Item href="/?path=/docs/components-navigation-menu--modal">
        Menu Item Link
      </MenuV2.Item>
      <NestedModal />
    </MenuV2>
  )
}

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
