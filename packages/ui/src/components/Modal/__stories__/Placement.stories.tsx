import type { StoryFn } from '@storybook/react-vite'
import { Modal } from '..'
import { Button } from '../../Button'
import { MODAL_PLACEMENT } from '../constants'

export const Placement: StoryFn = props => (
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
    description: {
      story: 'Here is a list of all the placement values we support',
    },
  },
}
