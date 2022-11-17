import { Story } from '@storybook/react'
import Modal from '..'
import Button from '../../Button'

export const IsClosable: Story = props => (
  <Modal {...props} disclosure={<Button>isClosable</Button>} isClosable={false}>
    {({ hide }: { hide: () => void }) => (
      <>
        <p>You don&apos;t have a close Icon</p>
        <Button
          onClick={() => {
            hide()
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
    storyDescription: 'To hide close button at the top, specify `isClosable`',
  },
}
