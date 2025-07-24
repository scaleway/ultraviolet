import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Button } from '../../Button'
import { Text } from '../../Text'

export const DefaultDisclosure = <Button>Open Modal</Button>

export const Template: StoryFn<typeof Modal> = ({ disclosure, ...props }) => (
  <Modal disclosure={disclosure} {...props}>
    <Text as="p" variant="body" sentiment="neutral">
      Content should be present in center of the modal
    </Text>
  </Modal>
)

Template.args = {
  disclosure: DefaultDisclosure,
}
