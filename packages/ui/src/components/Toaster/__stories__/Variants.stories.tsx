import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import { ToastContainer, toast } from '..'
import { Button } from '../../index'

export const Variants = (props: ComponentProps<typeof ToastContainer>) => (
  <>
    <ToastContainer {...props} />
    <Button variant="success" onClick={() => toast.success('This is success')}>
      Success
    </Button>
    <Button variant="info" onClick={() => toast.info('This is info')}>
      Info
    </Button>
    <Button variant="warning" onClick={() => toast.error('This is error')}>
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
] as DecoratorFunction<JSX.Element>[]
