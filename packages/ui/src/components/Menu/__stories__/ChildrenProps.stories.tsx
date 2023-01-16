import type { ComponentStory } from '@storybook/react'
import { fireEvent, screen } from '@storybook/testing-library'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const ChildrenProps: ComponentStory<typeof Menu> = () => (
  <Menu disclosure={DefaultDisclosure}>
    {({ toggle }) => (
      <>
        <Menu.Item>default</Menu.Item>
        <Menu.Item onClick={toggle} variant="danger">
          Danger
        </Menu.Item>
        <Menu.Item onClick={toggle} variant="nav">
          Nav
        </Menu.Item>
        <Menu.Item onClick={toggle} variant="nav" disabled>
          Nav disabled
        </Menu.Item>
        <Menu.Item onClick={toggle} variant="nav" disabled borderless>
          Nav disabled borderless
        </Menu.Item>
        <Menu.Item
          href="/?path=/docs/components-navigation-menu--children-props"
          onClick={toggle}
        >
          Menu Item Link
        </Menu.Item>
      </>
    )}
  </Menu>
)

ChildrenProps.parameters = {
  docs: {
    storyDescription: `Use children props :
- \`toggle\` to toggle menu with action`,
  },
}

ChildrenProps.play = () => {
  fireEvent.click(screen.getByRole('button'))
}

ChildrenProps.decorators = [
  StoryComponent => (
    <div style={{ height: '250px' }}>
      <StoryComponent />
    </div>
  ),
]
