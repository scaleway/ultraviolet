import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal } from '..'
import { MODAL_WIDTH } from '../constants'

export const Size: StoryFn = props => (
  <>
    {Object.keys(MODAL_WIDTH).map(size => (
      <div key={size} style={{ display: 'inline-block', padding: 16 }}>
        <Modal
          {...props}
          disclosure={<Button>{size}</Button>}
          size={size as keyof typeof MODAL_WIDTH}
        >
          <div style={{ padding: 32 }}>Content of the {size} modal</div>
        </Modal>
      </div>
    ))}
  </>
)

Size.parameters = {
  docs: {
    description: { story: 'Here is a list of all the size values we support' },
  },
}
