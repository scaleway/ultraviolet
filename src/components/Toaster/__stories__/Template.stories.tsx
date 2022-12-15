import type { ComponentStory } from '@storybook/react'
import ToastContainer, { toast } from '..'
import { Button } from '../../index'

export const Template: ComponentStory<typeof ToastContainer> = args => (
  <>
    <ToastContainer {...args} />
    <Button variant="success" onClick={() => toast.success('This is success')}>
      Success
    </Button>
  </>
)
