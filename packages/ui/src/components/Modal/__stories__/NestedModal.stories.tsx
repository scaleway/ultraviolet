import type { StoryFn } from '@storybook/react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Modal } from '../index'

export const NestedModal: StoryFn = props => (
  <Modal {...props} disclosure={<Button>Open Parent Modal</Button>}>
    <Stack gap={1}>
      Parent Modal
      <Modal {...props} disclosure={<Button>Open Children Modal</Button>}>
        <Stack gap={1}>
          Children Modal
          <Modal {...props} disclosure={<Button>Open Children Modal</Button>}>
            Children Children Modal
          </Modal>
        </Stack>
      </Modal>
    </Stack>
  </Modal>
)
