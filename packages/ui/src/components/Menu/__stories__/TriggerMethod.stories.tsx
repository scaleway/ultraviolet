import type { StoryFn } from '@storybook/react-vite'
import { Menu } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DefaultDisclosure } from './Template.stories'

export const TriggerMethod: StoryFn<typeof Menu> = () => (
  <Stack gap={3} width="100%">
    <Stack gap={1} direction="row" alignItems="center">
      <Text as="p" variant="bodyStrong">
        Menu with triggerMethod set to click:
      </Text>
      <Menu disclosure={DefaultDisclosure} triggerMethod="click">
        <Menu.Item borderless>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item borderless sentiment="danger">
          Item 3
        </Menu.Item>
      </Menu>
    </Stack>
    <Stack gap={1} direction="row" alignItems="center">
      <Text as="p" variant="bodyStrong">
        Menu with triggerMethod set to hover:
      </Text>
      <Menu disclosure={DefaultDisclosure} triggerMethod="hover">
        <Menu.Item borderless>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item borderless sentiment="danger">
          Item 3
        </Menu.Item>
      </Menu>
    </Stack>
  </Stack>
)

TriggerMethod.parameters = {
  docs: {
    description: {
      story:
        'By default the menu is triggered by clicking the disclosure button. You can change this behavior by setting the `triggerMethod` prop to `hover` and the menu will open when the user hovers over the disclosure.',
    },
  },
}

TriggerMethod.decorators = [
  StoryComponent => (
    <div style={{ height: '300px' }}>
      <StoryComponent />
    </div>
  ),
]
