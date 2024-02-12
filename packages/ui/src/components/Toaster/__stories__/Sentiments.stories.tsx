import type { Decorator, StoryFn } from '@storybook/react'
import { ToastContainer, toast } from '..'
import { Button } from '../../index'

export const Sentiments: StoryFn<typeof ToastContainer> = args => (
  <>
    <ToastContainer {...args} />
    <Button
      sentiment="neutral"
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
    <Button
      sentiment="warning"
      onClick={() => toast.warning('This is warning')}
    >
      Warning
    </Button>
  </>
)

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Sentiments defines different colors of you component. Using `toast.success()`, `toast.error()`, `toast.warning()` or `toast.info()` will automatically set the correct sentiment. **⚠️ Info is deprecated ⚠️**',
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
