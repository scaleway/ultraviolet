import type { Story } from '@storybook/react'
import Modal, { MODAL_ANIMATION } from '..'
import Button from '../../Button'

export const Animated: Story = props => (
  <>
    {Object.keys(MODAL_ANIMATION).map(animation => (
      <div style={{ display: 'inline-block', padding: 16 }} key={animation}>
        <Modal
          {...props}
          animated
          animation={animation as keyof typeof MODAL_ANIMATION}
          disclosure={<Button>{animation}</Button>}
        >
          <div style={{ padding: 32 }}>Modal should be animated</div>
        </Modal>
      </div>
    ))}
  </>
)

Animated.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the animated values we support',
  },
}
