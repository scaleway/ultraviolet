import type { Story } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const ModalProp: Story = props => (
  <Modal
    {...props}
    disclosure={<Button>modal</Button>}
    width="medium"
    modal={false}
  >
    <div style={{ padding: 32 }}>
      Our modal is just below our Button in the DOM{' '}
    </div>
  </Modal>
)

ModalProp.storyName = 'Modal'
ModalProp.parameters = {
  docs: {
    storyDescription:
      '`modal` props can set the modal just below the button in the DOM',
  },
}
