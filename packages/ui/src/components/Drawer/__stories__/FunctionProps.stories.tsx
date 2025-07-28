import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Drawer } from '..'

export const FunctionProps: StoryFn = props => (
  <Stack direction="row" gap={2}>
    <Drawer
      {...props}
      disclosure={<Button>Function children</Button>}
      header="Function children"
      footer="Footer"
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
      header="Function footer"
      footer={({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
    >
      Children
    </Drawer>

    <Drawer
      {...props}
      isClosable={false}
      disclosure={<Button>Function header</Button>}
      header={({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
      footer="footer"
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
