import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const WithDisclosureFunction: StoryFn = props => (
  <Modal
    {...props}
    disclosure={disclosureProps => (
      <Button>disclosure {disclosureProps?.baseId}</Button>
    )}
  >
    Content
  </Modal>
)
