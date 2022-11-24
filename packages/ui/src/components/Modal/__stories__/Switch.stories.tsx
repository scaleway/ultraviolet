import { Story } from '@storybook/react'
import Modal from '..'
import Toggle from '../../Toggle'

export const Switch: Story = props => (
  <Modal
    {...props}
    disclosure={dialog => (
      <Toggle name="switch" onChange={() => dialog?.toggle?.()} />
    )}
  >
    <div>Content should be present in center of the modal</div>
  </Modal>
)
