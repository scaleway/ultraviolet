import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal } from '..'

export const IsClosable: StoryFn = props => (
  <Modal {...props} disclosure={<Button>isClosable</Button>} isClosable={false}>
    {({ toggle }) => (
      <>
        <p>You don&apos;t have a close Icon</p>
        <Button
          onClick={() => {
            toggle()
          }}
        >
          Close
        </Button>
      </>
    )}
  </Modal>
)

IsClosable.parameters = {
  docs: {
    description: {
      story: 'To hide close button at the top, specify `isClosable`',
    },
  },
}
