import type { Story } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const WithDisclosureFunction: Story = props => (
  <Modal
    {...props}
    disclosure={disclosureProps => (
      <Button>disclosure {disclosureProps?.baseId}</Button>
    )}
  >
    Content
  </Modal>
)
