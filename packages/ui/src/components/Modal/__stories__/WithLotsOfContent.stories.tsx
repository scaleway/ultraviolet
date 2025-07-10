import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Button } from '../../Button'

export const WithLotsOfContent: StoryFn = props => (
  <Modal
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
    description: {
      story: 'Having a lot of content automatically adds a scroll',
    },
  },
}
