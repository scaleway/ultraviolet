import { Story } from '@storybook/react'
import Modal from '..'
import Button from '../../Button'

export const Height: Story = props => (
  <Modal {...props} disclosure={<Button>Height 100%</Button>} height="100%">
    <div style={{ padding: 32 }}>
      Hello there this a modal with a full height
    </div>
  </Modal>
)

Height.parameters = {
  docs: {
    storyDescription: 'You can customise the `height` of the modal',
  },
}
