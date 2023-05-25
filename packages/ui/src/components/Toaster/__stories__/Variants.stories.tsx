import type { Decorator } from '@storybook/react'
import { ToastContainer, toast } from '..'
import { Button } from '../../index'

export const Variants = () => (
  <>
    <ToastContainer />
    <Button
      sentiment="success"
      onClick={() => toast.success('This is success')}
    >
      Success
    </Button>
    <Button sentiment="info" onClick={() => toast.info('This is info')}>
      Info
    </Button>
    <Button sentiment="danger" onClick={() => toast.error('This is error')}>
      Error
    </Button>
  </>
)

Variants.parameters = {
  docs: {
    description: {
      story:
        'Variants defines different colors of you component. You can define it using `variant` property.',
    },
  },
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
