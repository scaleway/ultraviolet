import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Button } from '../../Button'

export const HideOnClickOutside: StoryFn = props => (
  <Modal
    {...props}
    disclosure={<Button>hideOnClickOutside</Button>}
    size="small"
    hideOnClickOutside={false}
  >
    <div style={{ padding: 32 }}>Try to click outside of the Modal</div>
  </Modal>
)

HideOnClickOutside.parameters = {
  docs: {
    description: {
      story:
        'To close or keep modal on click outside, specify `hideOnClickOutside`',
    },
  },
}
