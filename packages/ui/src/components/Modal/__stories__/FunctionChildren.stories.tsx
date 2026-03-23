import { Modal } from '..'
import { Button } from '../../Button'

import type { StoryFn } from '@storybook/react-vite'

export const FunctionChildren: StoryFn = props => (
  <Modal {...props} disclosure={<Button>modal</Button>}>
    {({ close }) => (
      <Button onClick={close}>A custom button that can close the modal</Button>
    )}
  </Modal>
)
