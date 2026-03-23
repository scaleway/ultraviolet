import { Modal } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const WithDisclosureBeingANativeElement: StoryFn = props => (
  <Modal {...props} disclosure={<button type="button">disclosure</button>}>
    Content
  </Modal>
)
