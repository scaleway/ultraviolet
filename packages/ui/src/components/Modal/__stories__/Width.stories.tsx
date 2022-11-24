import { Story } from '@storybook/react'
import Modal, { MODAL_WIDTH } from '..'
import Button from '../../Button'

export const Width: Story = props => (
  <>
    {Object.keys(MODAL_WIDTH).map(width => (
      <div style={{ display: 'inline-block', padding: 16 }} key={width}>
        <Modal
          {...props}
          width={width as keyof typeof MODAL_WIDTH}
          disclosure={<Button>{width}</Button>}
        >
          <div style={{ padding: 32 }}>Content of the {width} modal</div>
        </Modal>
      </div>
    ))}
  </>
)

Width.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the width values we support',
  },
}
