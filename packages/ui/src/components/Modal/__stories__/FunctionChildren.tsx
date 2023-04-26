import type { Story } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const FunctionChildren: Story = props => (
  <Modal {...props} disclosure={<Button>modal</Button>}>
    {({ baseId }: { baseId: string }) => <p>Content {baseId} </p>}
  </Modal>
)
