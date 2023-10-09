import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'
import { MODAL_WIDTH } from '../constants'

export const Size: StoryFn = props => (
  <>
    {Object.keys(MODAL_WIDTH).map(width => (
      <div style={{ display: 'inline-block', padding: 16 }} key={width}>
        <Modal
          {...props}
          size={width as keyof typeof MODAL_WIDTH}
          disclosure={<Button>{width}</Button>}
        >
          <div style={{ padding: 32 }}>Content of the {width} modal</div>
        </Modal>
      </div>
    ))}
  </>
)

Size.parameters = {
  docs: {
    description: { story: 'Here is a list of all the width values we support' },
  },
}
