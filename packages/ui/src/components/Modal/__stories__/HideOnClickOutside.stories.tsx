import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal } from '..'

export const HideOnClickOutside: StoryFn = props => (
  <Modal
    {...props}
    disclosure={<Button>hideOnClickOutside</Button>}
    hideOnClickOutside={false}
    size="small"
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
