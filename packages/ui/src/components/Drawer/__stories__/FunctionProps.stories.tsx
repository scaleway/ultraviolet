import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Drawer } from '..'

export const FunctionProps: StoryFn = props => (
  <Stack direction="row" gap={2}>
    <Drawer
      {...props}
      disclosure={<Button>Function children</Button>}
      footer="Footer"
      header="Function children"
    >
      {({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
    </Drawer>

    <Drawer
      {...props}
      disclosure={<Button>Function footer</Button>}
      footer={({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
      header="Function footer"
    >
      Children
    </Drawer>

    <Drawer
      {...props}
      disclosure={<Button>Function header</Button>}
      footer="footer"
      header={({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
      isClosable={false}
    >
      children
    </Drawer>
  </Stack>
)

FunctionProps.parameters = {
  docs: {
    description: {
      story:
        '`disclosure`, `footer`, `header` and `children` can all be functions that can get the Drawer state',
    },
  },
}
