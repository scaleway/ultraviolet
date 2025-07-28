import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal } from '..'

export const WithDisclosureFunction: StoryFn = props => (
  <Modal
    {...props}
    disclosure={disclosureProps => (
      <Button>
        Modal is visible : {disclosureProps?.visible ? 'yes' : 'no'}
      </Button>
    )}
  >
    Content
  </Modal>
)
