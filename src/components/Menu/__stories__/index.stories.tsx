import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Menu from '..'
import { Icon, Modal as SWUIModal, Touchable } from '../..'
import Item from '../Item'

export default {
  component: Menu,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: '1em', marginLeft: '2em' }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A menu is a widget that offers a list of choices to the user, such as a set of actions or functions. A menu is usually opened, or made visible, by activating a menu button, choosing an item in a menu that opens a sub menu, or by invoking a command, such as Shift + F10 on Windows, that opens a context specific menu. When a user activates a choice in a menu, the menu usually closes unless the choice opened a submenu.',
      },
    },
  },
  subcomponents: { Item },
  title: 'Components/Navigation/Menu',
} as Meta

const DefaultDisclosure = (
  <Touchable title="menu" name="menu">
    <Icon name="dots-horizontal" color="gray550" size={24} />
  </Touchable>
)

const Template: Story<ComponentProps<typeof Menu>> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => (
  <div style={{ height: '80px' }}>
    <Menu disclosure={disclosure} {...props}>
      <Menu.Item>MenuItem</Menu.Item>
      <Menu.Item to="/?path=/docs/components-menu--basic">
        MenuItemLink
      </Menu.Item>
    </Menu>
  </div>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'A set of variant you can add on MenuItem (danger, nav). You can use either props on MenuItem : - `onClick` to define menu actions. - `to` to define as a `React Router Link`. - `href` to define as a native link `a`.',
  },
}
Variants.decorators = [
  () => (
    <div style={{ height: '300px' }}>
      <Menu disclosure={DefaultDisclosure}>
        <Menu.Item>default</Menu.Item>
        <Menu.Item variant="danger">Danger</Menu.Item>
        <Menu.Item variant="nav">Nav</Menu.Item>
        <Menu.Item>default</Menu.Item>
        <Menu.Item to="/?path=/docs/components-menu--basic">Link</Menu.Item>
        <Menu.Item variant="danger" to="/?path=/docs/components-menu--basic">
          Link Danger
        </Menu.Item>
        <Menu.Item
          variant="danger"
          to="/?path=/docs/components-menu--basic"
          disabled
        >
          Link Danger Disabled
        </Menu.Item>
        <Menu.Item variant="nav" to="/?path=/docs/components-menu--basic">
          Link Nav
        </Menu.Item>
        <Menu.Item
          variant="nav"
          to="/?path=/docs/components-menu--basic"
          disabled
        >
          Link Nav disabled
        </Menu.Item>
      </Menu>
    </div>
  ),
]

export const Borderless = Template.bind({})
Borderless.parameters = {
  docs: {
    storyDescription:
      'Property `borderless` avoids a bottom border on MenuItem',
  },
}
Borderless.decorators = [
  () => (
    <div style={{ height: '250px' }}>
      <Menu disclosure={DefaultDisclosure}>
        <Menu.Item borderless>default</Menu.Item>
        <Menu.Item variant="danger" borderless>
          Danger
        </Menu.Item>
        <Menu.Item variant="nav" borderless>
          Nav
        </Menu.Item>
        <Menu.Item borderless>default</Menu.Item>
        <Menu.Item to="/?path=/docs/components-menu--basic" borderless>
          Link
        </Menu.Item>
        <Menu.Item
          variant="danger"
          to="/?path=/docs/components-menu--basic"
          borderless
        >
          Link Danger
        </Menu.Item>
        <Menu.Item
          variant="nav"
          to="/?path=/docs/components-menu--basic"
          borderless
        >
          Link Nav
        </Menu.Item>
      </Menu>
    </div>
  ),
]

export const ChildrenProps = Template.bind({})
ChildrenProps.parameters = {
  docs: {
    storyDescription:
      'Use children props : - `toggle` to toggle menu with action',
  },
}
ChildrenProps.decorators = [
  () => (
    <div style={{ height: '250px' }}>
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
              to="/?path=/docs/components-menu--disclosure"
              onClick={toggle}
            >
              Menu Item Link
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  ),
]

export const Modal = Template.bind({})
Modal.parameters = {
  docs: {
    storyDescription: 'This show how to use a modal on MenuItem.',
  },
}
Modal.decorators = [
  () => (
    <div style={{ height: '100px' }}>
      <Menu disclosure={DefaultDisclosure}>
        <Menu.Item>Menu Item</Menu.Item>
        <Menu.Item to="/?path=/docs/components-menu--disclosure">
          Menu Item Link
        </Menu.Item>
        <SWUIModal
          animated
          animation="scaleUp"
          disclosure={<Menu.Item>MenuItem with Modal</Menu.Item>}
        >
          <div style={{ padding: 32 }}>
            Content should be present in center of the modal
          </div>
          <div style={{ padding: 32 }}>
            Content should be present in center of the modal
          </div>
        </SWUIModal>
      </Menu>
    </div>
  ),
]

export const AdvancedWIP = Template.bind({})
AdvancedWIP.parameters = {
  docs: {
    storyDescription: 'Still Work In Progress. Add a sub menu item.',
  },
}
AdvancedWIP.decorators = [
  () => (
    <div style={{ height: '300px' }}>
      <Menu disclosure={DefaultDisclosure}>
        <Menu.Item>MenuItem</Menu.Item>
        <Menu.Item to="/?path=/docs/components-menu--basic">
          Menu Item with React Router Link
        </Menu.Item>
        <Menu.Item href="https://react.ui.scaleway.com">
          Menu Item with native a
        </Menu.Item>
        <Menu.Item>MenuItem</Menu.Item>
        <Menu
          hasArrow={false}
          disclosure={() => <Menu.Item>Sub Menu</Menu.Item>}
        >
          <Menu.Item>Sub</Menu.Item>
          <Menu.Item>Sub 1</Menu.Item>
          <Menu.Item>Sub 1</Menu.Item>
        </Menu>
      </Menu>
    </div>
  ),
]
