import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const LongMenu: StoryFn<typeof Menu> = ({ ...props }) => (
  <Menu {...props} disclosure={DefaultDisclosure}>
    <Menu.Group label="Server">
      <Menu.Item borderless>
        <Stack
          alignItems="center"
          direction="row"
          flex={1}
          justifyContent="space-between"
        >
          Information&nbsp;
          <Badge sentiment="success" size="small">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item borderless sentiment="neutral">
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger">Delete</Menu.Item>
    </Menu.Group>
    <Menu.Group label="Dedicated Server">
      <Menu.Item borderless>
        <Stack
          alignItems="center"
          direction="row"
          flex={1}
          justifyContent="space-between"
        >
          Information&nbsp;
          <Badge sentiment="success" size="small">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item borderless sentiment="neutral">
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger">Delete</Menu.Item>
    </Menu.Group>
    <Menu.Group label="Kubernetes">
      <Menu.Item borderless>
        <Stack
          alignItems="center"
          direction="row"
          flex={1}
          justifyContent="space-between"
        >
          Information&nbsp;
          <Badge sentiment="success" size="small">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item borderless sentiment="neutral">
        Power off
      </Menu.Item>
      <Menu.Item sentiment="danger">Delete</Menu.Item>
    </Menu.Group>
    <Menu.Group label="Serverless">
      <Menu.Item borderless>
        <Stack
          alignItems="center"
          direction="row"
          flex={1}
          justifyContent="space-between"
        >
          Information&nbsp;
          <Badge sentiment="success" size="small">
            New
          </Badge>
        </Stack>
      </Menu.Item>
      <Menu.Item borderless>Power on</Menu.Item>
      <Menu.Item borderless sentiment="neutral">
        Power off
      </Menu.Item>
      <Menu.Item borderless sentiment="danger">
        Delete
      </Menu.Item>
    </Menu.Group>
  </Menu>
)

LongMenu.parameters = {
  docs: {
    description: {
      story: 'When the menu is longer than 480px it will be scrollable.',
    },
  },
}

LongMenu.decorators = [
  StoryComponent => (
    <div style={{ height: '500px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
