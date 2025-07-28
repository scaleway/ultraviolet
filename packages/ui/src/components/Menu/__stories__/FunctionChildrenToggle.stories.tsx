import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Menu } from '..'

export const FunctionChildrenToggle: StoryFn<typeof Menu> = () => (
  <Menu disclosure={<Button>Menu </Button>}>
    {({ toggle }) => <Menu.Item onClick={toggle}>Menu 1</Menu.Item>}
  </Menu>
)

FunctionChildrenToggle.parameters = {
  docs: {
    description: {
      story: 'You can specify a use a children function to get toggle props',
    },
  },
}

FunctionChildrenToggle.decorators = [
  StoryComponent => (
    <div style={{ height: '300px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
