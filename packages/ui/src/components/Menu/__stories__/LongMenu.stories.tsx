import type { StoryFn } from '@storybook/react'
import { Menu } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { DefaultDisclosure } from './Template.stories'

export const LongMenu: StoryFn<typeof Menu> = ({ ...props }) => (
  <Menu {...props} disclosure={DefaultDisclosure}>
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
