import type { StoryFn } from '@storybook/react-vite'
import { Menu } from '..'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { DefaultDisclosure } from './Template.stories'

export const Footer: StoryFn<typeof Menu> = ({ ...props }) => (
  <Menu
    {...props}
    disclosure={DefaultDisclosure}
    footer={
      <Stack>
        This is a footer...
        <Button>...with a button</Button>
      </Stack>
    }
  >
    <Menu.Group label="Server">
      <Menu.Item borderless>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          Information&nbsp;
          <Badge size="small" sentiment="success">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item sentiment="neutral" borderless>
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger">Delete</Menu.Item>
    </Menu.Group>
    <Menu.Group label="Dedicated Server">
      <Menu.Item borderless>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          Information&nbsp;
          <Badge size="small" sentiment="success">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item sentiment="neutral" borderless>
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger">Delete</Menu.Item>
    </Menu.Group>
    <Menu.Group label="Kubernetes">
      <Menu.Item borderless>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          Information&nbsp;
          <Badge size="small" sentiment="success">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item sentiment="neutral" borderless>
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger">Delete</Menu.Item>
    </Menu.Group>
    <Menu.Group label="Serverless">
      <Menu.Item borderless>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          Information&nbsp;
          <Badge size="small" sentiment="success">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item sentiment="neutral" borderless>
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger" borderless>
        Delete
      </Menu.Item>
    </Menu.Group>
  </Menu>
)

Footer.parameters = {
  docs: {
    description: {
      story:
        'It is possible to add a footer to the menu which is always visible.',
    },
  },
}

Footer.decorators = [
  StoryComponent => (
    <div style={{ height: '500px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
