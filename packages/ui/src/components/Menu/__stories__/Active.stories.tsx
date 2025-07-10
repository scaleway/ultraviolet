import type { StoryFn } from '@storybook/react-vite'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Active: StoryFn<typeof Menu> = () => (
  <Menu disclosure={DefaultDisclosure}>
    <Menu.Item>default (neutral)</Menu.Item>
    <Menu.Item sentiment="danger" active>
      Active Danger
    </Menu.Item>
    <Menu.Item active>Active Neutral</Menu.Item>
    <Menu.Item sentiment="primary" active>
      Active Primary
    </Menu.Item>
  </Menu>
)

Active.parameters = {
  docs: {
    description: {
      story:
        'Property `active` give a visual feedback to the user that the current item is selected. It can be useful to highlight the current page in case of a navigation.',
    },
  },
}

Active.decorators = [
  StoryComponent => (
    <div style={{ height: '250px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
