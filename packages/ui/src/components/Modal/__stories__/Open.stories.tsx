import type { StoryFn } from '@storybook/react-vite'
import { useReducer } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Modal } from '../index'

export const Open: StoryFn = props => {
  const [open, toggleOpen] = useReducer(prevState => !prevState, false)

  return (
    <Stack gap={2}>
      <Button onClick={toggleOpen}>Open modal</Button>
      <Modal {...props} open={open} onClose={toggleOpen}>
        Modal content
      </Modal>
    </Stack>
  )
}

Open.parameters = {
  docs: {
    description: {
      story:
        '`open` prop allow you to control when modal is open instead of using the `disclosure` prop',
    },
  },
}
