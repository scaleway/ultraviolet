import type { Story } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const WithLotsOfContent: Story = props => (
  <Modal
    animated
    animation="scaleUp"
    disclosure={<Button>Open Modal with lot of content</Button>}
    {...props}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
      <div>Content should be present in center of the modal</div>
    </div>
  </Modal>
)
WithLotsOfContent.parameters = {
  docs: {
    storyDescription: 'Having a lot of content automatically adds a scroll',
  },
}
