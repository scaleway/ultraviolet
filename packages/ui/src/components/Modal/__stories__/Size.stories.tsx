import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Modal } from '..'
import { MODAL_WIDTH } from '../constants'

export const Size: StoryFn = props => (
  <>
    {Object.keys(MODAL_WIDTH).map(size => (
      <div style={{ display: 'inline-block', padding: 16 }} key={size}>
        <Modal
          {...props}
          size={size as keyof typeof MODAL_WIDTH}
          disclosure={<Button>{size}</Button>}
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
