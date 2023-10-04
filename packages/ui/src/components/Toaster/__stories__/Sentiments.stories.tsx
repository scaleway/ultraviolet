import type { Decorator, StoryFn } from '@storybook/react'
import { ToastContainer, toast } from '..'
import { Button } from '../../index'

export const Sentiments: StoryFn<typeof ToastContainer> = args => (
  <>
    <ToastContainer {...args} />
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

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Sentiments defines different colors of you component. Using `toast.success()`, `toast.info()` or `toast.error()` will automatically set the correct sentiment',
    },
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
