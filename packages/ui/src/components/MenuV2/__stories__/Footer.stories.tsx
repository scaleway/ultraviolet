import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { DefaultDisclosure } from './Template.stories'

export const Footer: StoryFn<typeof MenuV2> = ({ ...props }) => (
  <MenuV2
    {...props}
    disclosure={DefaultDisclosure}
    footer={
      <Stack>
        This is a footer...
        <Button>...with a button</Button>
      </Stack>
    }
  >
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
