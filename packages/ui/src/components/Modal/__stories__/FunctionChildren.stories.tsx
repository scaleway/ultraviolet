import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const FunctionChildren: StoryFn = props => (
  <Modal {...props} disclosure={<Button>modal</Button>}>
    {({ onClose }) => (
      <Button onClick={onClose}>
        A custom button that can close the modal
      </Button>
    )}
  </Modal>
)
