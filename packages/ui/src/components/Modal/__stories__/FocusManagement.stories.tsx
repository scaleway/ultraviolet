import type { StoryFn } from '@storybook/react-vite'
import { useReducer } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Modal } from '../index'
import { styleButton } from './style.css'

export const FocusManagement: StoryFn = props => {
  const [open, toggleOpen] = useReducer(prevState => !prevState, false)

  return (
    <Stack gap={2} width="fit-content">
      With open prop: (focus lost when closing the modal)
      <Button onClick={toggleOpen} className={styleButton}>
        Open modal 1
      </Button>
      <Modal {...props} onClose={toggleOpen} open={open}>
        Modal content
      </Modal>
      With disclosure: (focus restored to disclosure when closing the modal)
      <Modal disclosure={<Button className={styleButton}>Open Modal 2</Button>} {...props}>
        Content should be present in center of the modal
      </Modal>
      <Text italic as="p" variant="bodySmall">
        (Focused button has a dotted outline and a <strong>[has focus]</strong> indicator.)
      </Text>
    </Stack>
  )
}
