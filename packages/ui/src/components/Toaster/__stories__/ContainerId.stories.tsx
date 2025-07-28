import type { StoryFn } from '@storybook/react-vite'
import { Button, Stack } from '../../index'
import { ToastContainer, toast } from '..'

export const ContainerId: StoryFn<typeof ToastContainer> = args => (
  <Stack direction="row" gap={2}>
    <ToastContainer {...args} containerId="toaster1" position="bottom-left" />
    <Button
      sentiment="neutral"
      onClick={() =>
        toast.success('Toaster from container 1', undefined, 'toaster1')
      }
    >
      Container 1
    </Button>
    <ToastContainer {...args} containerId="toaster2" position="top-right" />
    <Button
      sentiment="neutral"
      onClick={() =>
        toast.success('Toaster from container 2', undefined, 'toaster2')
      }
    >
      Container 2
    </Button>
  </Stack>
)

ContainerId.parameters = {
  docs: {
    description: {
      story:
        'It is possible to use multiple containers and assign each toaster to a specific container using prop `containerId`',
    },
  },
}
