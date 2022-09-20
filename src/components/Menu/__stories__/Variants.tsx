import { fireEvent, screen } from '@storybook/testing-library'
import Menu from '..'
import { Template } from './Template'

export const Variants = Template.bind({})

Variants.parameters = {
  docs: {
    storyDescription:
      'A set of variant you can add on MenuItem (danger, nav). You can use either props on MenuItem :\n- `onClick` to define menu actions.\n- `to` to define as a `React Router Link`.\n- `href` to define as a native link `a`.',
  },
}

Variants.args = {
  children: [
    <Menu.Item>default</Menu.Item>,
    <Menu.Item variant="danger">Danger</Menu.Item>,
    <Menu.Item variant="nav">Nav</Menu.Item>,
    <Menu.Item>default</Menu.Item>,
    <Menu.Item href="/?path=/docs/components-navigation-menu--default">
      Link
    </Menu.Item>,
    <Menu.Item
      variant="danger"
      href="/?path=/docs/components-navigation-menu--default"
    >
      Link Danger
    </Menu.Item>,
    <Menu.Item
      variant="danger"
      href="/?path=/docs/components-navigation-menu--default"
      disabled
    >
      Link Danger Disabled
    </Menu.Item>,
    <Menu.Item
      variant="nav"
      href="/?path=/docs/components-navigation-menu--default"
    >
      Link Nav
    </Menu.Item>,
    <Menu.Item
      variant="nav"
      href="/?path=/docs/components-navigation-menu--default"
      disabled
    >
      Link Nav disabled
    </Menu.Item>,
  ],
}

Variants.play = () => {
  fireEvent.click(screen.getByRole('button'))
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ height: '300px' }}>
      <StoryComponent />
    </div>
  ),
]
