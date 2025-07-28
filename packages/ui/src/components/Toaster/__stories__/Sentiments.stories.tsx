import type { Decorator, StoryFn } from '@storybook/react-vite'
import { Button } from '../../index'
import { ToastContainer, toast } from '..'

export const Sentiments: StoryFn<typeof ToastContainer> = args => (
  <div style={{ height: '300px' }}>
    <ToastContainer {...args} />
    <Button
      onClick={() => toast.success('This is success')}
      sentiment="neutral"
    >
      Success
    </Button>
    <Button onClick={() => toast.error('This is error')} sentiment="danger">
      Error
    </Button>
    <Button
      onClick={() => toast.warning('This is warning')}
      sentiment="warning"
    >
      Warning
    </Button>
  </div>
)

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Sentiments defines different colors of you component. Using `toast.success()`, `toast.error()` or `toast.warning()` will automatically set the correct sentiment.',
    },
  },
}

Sentiments.args = {
  position: 'bottom-right',
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
