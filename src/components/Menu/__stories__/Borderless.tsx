import { fireEvent, screen } from '@storybook/testing-library'
import Menu from '..'
import { Template } from './Template'

export const Borderless = Template.bind({})

Borderless.parameters = {
  docs: {
    storyDescription: 'Property `borderless` removes border of the menu item.',
  },
}

Borderless.args = {
  children: [
    <Menu.Item borderless>default</Menu.Item>,
    <Menu.Item variant="danger" borderless>
      Danger
    </Menu.Item>,
    <Menu.Item variant="nav" borderless>
      Nav
    </Menu.Item>,
    <Menu.Item borderless>default</Menu.Item>,
    <Menu.Item
      href="/?path=/docs/components-navigation-menu--borderless"
      borderless
    >
      Link
    </Menu.Item>,
    <Menu.Item
      variant="danger"
      href="/?path=/docs/components-navigation-menu--borderless"
      borderless
    >
      Link Danger
    </Menu.Item>,
    <Menu.Item
      variant="nav"
      href="/?path=/docs/components-navigation-menu--borderless"
      borderless
    >
      Link Nav
    </Menu.Item>,
  ],
}

Borderless.play = () => {
  fireEvent.click(screen.getByRole('button'))
}

Borderless.decorators = [
  StoryComponent => (
    <div style={{ height: '250px' }}>
      <StoryComponent />
    </div>
  ),
]
