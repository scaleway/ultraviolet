import type { StoryFn } from '@storybook/react'
import { Button } from '../../Button'
import { Tooltip } from '../../Tooltip'
import { Modal } from '../index'

export const WithTooltip: StoryFn = props => (
  <Modal {...props} disclosure={<Button>With a Tooltip</Button>}>
    <Tooltip text="The Tooltip should be on top of the Modal.">
      Content with a tooltip
    </Tooltip>
  </Modal>
)
