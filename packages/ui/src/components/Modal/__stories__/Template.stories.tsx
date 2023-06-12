import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const DefaultDisclosure = <Button>Open Modal</Button>

export const Template: StoryFn<typeof Modal> = ({ disclosure, ...props }) => (
  <Modal disclosure={disclosure} {...props}>
    <div>Content should be present in center of the modal</div>
  </Modal>
)

Template.args = {
  disclosure: DefaultDisclosure,
}
