import type { StoryFn } from '@storybook/react'
import { Toast, ToastContainer, toast } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

const ButtonToaster = () => (
  <Stack
    gap={1}
    justifyContent="space-between"
    alignItems="center"
    direction="row"
    width="100%"
  >
    Personal data updated.
    <Toast.Button sentiment="neutral" variant="ghost">
      Undo
    </Toast.Button>
  </Stack>
)

const LinkToaster = () => (
  <Stack
    gap={1}
    justifyContent="space-between"
    alignItems="center"
    direction="row"
    width="100%"
  >
    Personal data updated.
    <Toast.Link href="https://scaleway.com">Reload</Toast.Link>
  </Stack>
)

export const ComplexChildren: StoryFn<typeof ToastContainer> = args => (
  <div style={{ height: '200px' }}>
    <Stack gap={2}>
      <ToastContainer
        {...args}
        containerId="complex-children"
        position="bottom-left"
        autoClose={0}
      />
      <Button
        sentiment="neutral"
        onClick={() =>
          toast.success(<ButtonToaster />, undefined, 'complex-children')
        }
      >
        Open toaster with button
      </Button>

      <Button
        sentiment="neutral"
        onClick={() =>
          toast.success(<LinkToaster />, undefined, 'complex-children')
        }
      >
        Open toaster with link
      </Button>
    </Stack>
  </div>
)

ComplexChildren.parameters = {
  docs: {
    description: {
      story:
        'To help you with the style of your toast, you can use the `Toast.Button` and `Toast.Link` components. Those sub components will be styled accordingly to the toast they are in.',
    },
  },
}
