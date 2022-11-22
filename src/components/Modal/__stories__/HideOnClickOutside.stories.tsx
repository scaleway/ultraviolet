import { Story } from '@storybook/react'
import Modal from '..'
import Button from '../../Button'

export const HideOnClickOutside: Story = props => (
  <Modal
    {...props}
    disclosure={<Button>hideOnClickOutside</Button>}
    width="small"
    hideOnClickOutside={false}
  >
    <div style={{ padding: 32 }}>Try to click outside of the Modal</div>
  </Modal>
)

HideOnClickOutside.parameters = {
  docs: {
    storyDescription:
      'To close or keep modal on click outside, specify `hideOnClickOutside`',
  },
}
