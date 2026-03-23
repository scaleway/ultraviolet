import { ToastContainer, toast } from '..'
import { Button } from '../../index'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof ToastContainer> = args => (
  <>
    <ToastContainer {...args} />
    <Button
      onClick={() => toast.success('This is success')}
      sentiment="neutral"
    >
      Success
    </Button>
  </>
)

Template.args = {
  position: 'bottom-right',
}
