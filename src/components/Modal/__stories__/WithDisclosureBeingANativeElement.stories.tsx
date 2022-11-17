import { Story } from '@storybook/react'
import Modal from '..'

export const WithDisclosureBeingANativeElement: Story = props => (
  <Modal {...props} disclosure={<button type="button">disclosure</button>}>
    Content
  </Modal>
)
