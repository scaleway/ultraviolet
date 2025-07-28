import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'

export const WithDisclosureBeingANativeElement: StoryFn = props => (
  <Modal {...props} disclosure={<button type="button">disclosure</button>}>
    Content
  </Modal>
)
