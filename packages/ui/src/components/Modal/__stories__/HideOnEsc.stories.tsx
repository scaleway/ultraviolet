import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Button } from '../../Button'

export const HideOnEsc: StoryFn = props => (
  <Modal
    {...props}
    disclosure={<Button>hideOnEsc</Button>}
    size="medium"
    hideOnEsc={false}
  >
    <div style={{ padding: 32 }}>try to ESCAPE</div>
  </Modal>
)
HideOnEsc.parameters = {
  docs: {
    description: {
      story:
        'To hide or keep modal on ESC key, specify `hideOnEsc`Here is a list of all the HideOnEsc values we support',
    },
  },
}
