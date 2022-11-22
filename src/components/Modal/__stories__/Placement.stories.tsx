import { Story } from '@storybook/react'
import Modal, { MODAL_PLACEMENT } from '..'
import Button from '../../Button'

export const Placement: Story = props => (
  <>
    {Object.keys(MODAL_PLACEMENT).map(placement => (
      <div style={{ display: 'inline-block', padding: 16 }} key={placement}>
        <Modal
          {...props}
          placement={placement as keyof typeof MODAL_PLACEMENT}
          disclosure={<Button>{placement}</Button>}
        >
          <div style={{ padding: 32 }}>Content of the {placement} modal</div>
        </Modal>
      </div>
    ))}
  </>
)

Placement.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the placement values we support',
  },
}
