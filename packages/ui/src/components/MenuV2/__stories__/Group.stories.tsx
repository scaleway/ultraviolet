import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Badge } from '../../Badge'
import { DefaultDisclosure } from './Template.stories'

export const Group: StoryFn<typeof MenuV2> = ({ ...props }) => (
  <MenuV2 {...props} disclosure={DefaultDisclosure}>
    <MenuV2.Group label="Server">
      <MenuV2.Item borderless>
        Information&nbsp;
        <Badge size="small" sentiment="success">
          New
        </Badge>
      </MenuV2.Item>
      <MenuV2.Item borderless>Power on</MenuV2.Item>
      <MenuV2.Item sentiment="neutral" borderless>
        Power off
      </MenuV2.Item>
      <MenuV2.Item sentiment="danger">Delete</MenuV2.Item>
    </MenuV2.Group>
    <MenuV2.Group label="Dedicated Server">
      <MenuV2.Item borderless>
        Information&nbsp;
        <Badge size="small" sentiment="success">
          New
        </Badge>
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
        'You can group items together using the `Menu.Group` component and adding `Menu.Item` components as children.',
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
