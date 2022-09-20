import { fireEvent, screen } from '@storybook/testing-library'
import Menu from '..'
import { Template } from './Template'

export const ChildrenProps = Template.bind({})

const customCodeSnippet = `<Menu disclosure={<Touchable name="menu" title="menu"><Icon color="neutral" name="dots-horizontal" size={24}/></Touchable>}>
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
</Menu>`

ChildrenProps.parameters = {
  docs: {
    source: {
      code: customCodeSnippet,
    },
    storyDescription:
      'Use children props :\n- `toggle` to toggle menu with action',
  },
}

ChildrenProps.args = {
  children: ({ toggle }: { toggle: () => void }) => (
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
  ),
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
