import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../index'
import { ToastContainer, toast } from '..'

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
