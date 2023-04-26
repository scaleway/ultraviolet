import type { Story } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const PreventBodyScroll: Story = props => (
  <Modal
    {...props}
    disclosure={<Button>preventBodyScroll</Button>}
    preventBodyScroll
  >
    <div style={{ padding: 32 }}>
      Try to scroll on body ( outside of the Modal ) preventBodyScroll is
      available only when modal props is enabled
      https://reakit.io/docs/dialog/#props
    </div>
  </Modal>
)

PreventBodyScroll.parameters = {
  docs: {
    storyDescription:
      'To prevent body scroll outside of the modal, use `preventBodyScroll`',
  },
}
