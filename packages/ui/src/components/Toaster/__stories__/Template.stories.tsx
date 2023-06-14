import type { StoryFn } from '@storybook/react'
import { ToastContainer, toast } from '..'
import { Button } from '../../index'

export const Template: StoryFn<typeof ToastContainer> = args => (
  <>
    <ToastContainer {...args} />
    <Button
      sentiment="success"
      onClick={() => toast.success('This is success')}
    >
      Success
    </Button>
  </>
)
