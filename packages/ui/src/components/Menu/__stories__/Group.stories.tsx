import type { StoryFn } from '@storybook/react-vite'
import { InformationIcon } from '@ultraviolet/icons'
import { Menu } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { DefaultDisclosure } from './Template.stories'

export const Group: StoryFn<typeof Menu> = ({ ...props }) => (
  <Menu {...props} disclosure={DefaultDisclosure}>
    <Menu.Group
      label="Server"
      labelDescription={
        <Tooltip text="Your current server">
          <InformationIcon size="small" />
        </Tooltip>
      }
    >
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
      <Menu.Item sentiment="danger" borderless>
        Delete
      </Menu.Item>
    </Menu.Group>
  </Menu>
)

Group.parameters = {
  docs: {
    description: {
      story:
        'You can group items together using the `Menu.Group` component and adding `Menu.Item` components as children. On the group you can apply a `label` but also a `labelDescription` allowing to customise it further.',
    },
  },
}

Group.decorators = [
  StoryComponent => (
    <div style={{ height: '450px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
