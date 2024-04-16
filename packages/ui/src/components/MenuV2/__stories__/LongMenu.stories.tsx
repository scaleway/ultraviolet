import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { DefaultDisclosure } from './Template.stories'

export const LongMenu: StoryFn<typeof MenuV2> = ({ ...props }) => (
  <MenuV2 {...props} disclosure={DefaultDisclosure}>
    <MenuV2.Group label="Server">
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
      <MenuV2.Item sentiment="danger">Delete</MenuV2.Item>
    </MenuV2.Group>
    <MenuV2.Group label="Kubernetes">
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
    <MenuV2.Group label="Serverless">
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
