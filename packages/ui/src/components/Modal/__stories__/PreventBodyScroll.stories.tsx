import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Modal } from '..'

export const PreventBodyScroll: StoryFn = props => (
  <Stack gap={2} direction="row">
    <Modal
      {...props}
      disclosure={<Button>Scroll prevented</Button>}
      preventBodyScroll
    >
      <div style={{ padding: 32 }}>
        Try to scroll on body ( outside of the Modal )
      </div>
    </Modal>
    <Modal
      {...props}
      disclosure={<Button>Scroll not prevented</Button>}
      preventBodyScroll={false}
    >
      <div style={{ padding: 32 }}>
        Try to scroll on body ( outside of the Modal )
      </div>
    </Modal>
  </Stack>
)

PreventBodyScroll.parameters = {
  docs: {
    description: {
      story:
        'To prevent body scroll outside of the modal, use `preventBodyScroll`',
    },
  },
}
