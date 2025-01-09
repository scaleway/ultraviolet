import type { StoryFn } from '@storybook/react'
import { InformationIcon } from '@ultraviolet/icons'
import { MenuV2 } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { DefaultDisclosure } from './Template.stories'

export const Group: StoryFn<typeof MenuV2> = ({ ...props }) => (
  <MenuV2 {...props} disclosure={DefaultDisclosure}>
    <MenuV2.Group
      label="Server"
      labelDescription={
        <Tooltip text="Your current server">
          <InformationIcon size="small" />
        </Tooltip>
      }
    >
      <MenuV2.Item borderless>
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
      </MenuV2.Item>
      <MenuV2.Item borderless>Power on</MenuV2.Item>
      <MenuV2.Item sentiment="neutral" borderless>
        Power off
      </MenuV2.Item>
      <MenuV2.Item sentiment="danger">Delete</MenuV2.Item>
    </MenuV2.Group>
    <MenuV2.Group label="Dedicated Server">
      <MenuV2.Item borderless>
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
      </MenuV2.Item>
      <MenuV2.Item borderless>Power on</MenuV2.Item>
      <MenuV2.Item sentiment="neutral" borderless>
        Power off
      </MenuV2.Item>
      <MenuV2.Item sentiment="danger" borderless>
        Delete
      </MenuV2.Item>
    </MenuV2.Group>
  </MenuV2>
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
