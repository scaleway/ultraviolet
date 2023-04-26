import type { Story } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const NotBordered: Story = props => (
  <Modal {...props} disclosure={<Button>bordered</Button>} bordered={false}>
    <p>Your Modal is not bordered</p>
  </Modal>
)

NotBordered.parameters = {
  docs: {
    storyDescription: '`bordered` can remove modal borders',
  },
}
