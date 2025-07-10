import type { StoryFn } from '@storybook/react-vite'
import { ToastContainer, toast } from '..'
import { Button } from '../../index'

export const Template: StoryFn<typeof ToastContainer> = args => (
  <>
    <ToastContainer {...args} />
    <Button
      sentiment="neutral"
      onClick={() => toast.success('This is success')}
    >
      Success
    </Button>
  </>
)

Template.args = {
  position: 'bottom-right',
}
