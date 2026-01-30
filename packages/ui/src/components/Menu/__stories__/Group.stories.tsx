import type { StoryFn } from '@storybook/react-vite'
import { InformationIcon } from '@ultraviolet/icons/InformationIcon'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { Menu } from '..'
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
      <Menu.Item borderless sentiment="danger">
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
