import type { StoryFn } from '@storybook/react-vite'
import type { Popup } from '..'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Modal } from '../../../Modal'
import { InfoTip, Menu, Popover, Select } from './Examples.stories'

export const InModal: StoryFn<typeof Popup> = () => (
  <Modal disclosure={() => <Button sentiment="neutral">Open Modal</Button>}>
    <Stack gap={3} alignItems="start">
      <Popover />
      <Menu />
      <Select />
      <InfoTip />
    </Stack>
  </Modal>
)
