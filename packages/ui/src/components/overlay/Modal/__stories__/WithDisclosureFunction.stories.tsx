import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Button } from '../../../action/Button'

export const WithDisclosureFunction: StoryFn = props => (
  <Modal
    {...props}
    disclosure={disclosureProps => <Button>Modal is visible : {disclosureProps?.visible ? 'yes' : 'no'}</Button>}
  >
    Content
  </Modal>
)
