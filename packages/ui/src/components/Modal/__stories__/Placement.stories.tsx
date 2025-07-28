import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal } from '..'
import { MODAL_PLACEMENT } from '../constants'

export const Placement: StoryFn = props => (
  <>
    {Object.keys(MODAL_PLACEMENT).map(placement => (
      <div key={placement} style={{ display: 'inline-block', padding: 16 }}>
        <Modal
          {...props}
          disclosure={<Button>{placement}</Button>}
          placement={placement as keyof typeof MODAL_PLACEMENT}
        >
          <div style={{ padding: 32 }}>Content of the {placement} modal</div>
        </Modal>
      </div>
    ))}
  </>
)

Placement.parameters = {
  docs: {
    description: {
      story: 'Here is a list of all the placement values we support',
    },
  },
}
