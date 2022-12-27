import type { ComponentStory } from '@storybook/react'
import { fireEvent, screen } from '@storybook/testing-library'
import Menu from '..'
import Modal from '../../Modal'
import { DefaultDisclosure } from './Template.stories'

export const WithModal: ComponentStory<typeof Menu> = () => {
  const NestedModal = () => (
    <Modal
      animated
      animation="scaleUp"
      disclosure={<Menu.Item>MenuItem with Modal</Menu.Item>}
    >
      <div style={{ padding: 32 }}>
        Content should be present in center of the modal
      </div>
      <div style={{ padding: 32 }}>
        Content should be present in center of the modal
      </div>
    </Modal>
  )

  return (
    <Menu disclosure={DefaultDisclosure}>
      <Menu.Item>Menu Item</Menu.Item>
      <Menu.Item href="/?path=/docs/components-navigation-menu--modal">
        Menu Item Link
      </Menu.Item>
      <NestedModal />
    </Menu>
  )
}

WithModal.parameters = {
  docs: {
    storyDescription: 'This show how to use a modal on MenuItem.',
  },
}

WithModal.play = async () => {
  fireEvent.click(screen.getByRole('button'))
  const modalMenu = await screen.findByText('MenuItem with Modal')
  const button = modalMenu.closest('button')
  if (button !== null) {
    fireEvent.click(button)
  }
}

WithModal.decorators = [
  StoryComponent => (
    <div style={{ height: '100px' }}>
      <StoryComponent />
    </div>
  ),
]
