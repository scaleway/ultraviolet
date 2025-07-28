import type { Meta } from '@storybook/react-vite'
import { Menu } from '..'

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
  subcomponents: {
    'Menu.Group': Menu.Group,
    'Menu.Item': Menu.Item,
  },
  title: 'Components/Overlay/Menu',
} as Meta<typeof Menu>

export { Active } from './Active.stories'
export { Borderless } from './Borderless.stories'
export { Footer } from './Footer.stories'
export { FunctionChildrenToggle } from './FunctionChildrenToggle.stories'
export { FunctionDisclosure } from './FunctionDisclosure.stories'
export { Group } from './Group.stories'
export { LongMenu } from './LongMenu.stories'
export { Nested } from './Nested.stories'
export { Overflowing } from './Overflowing.stories'
export { Playground } from './Playground.stories'
export { Searchable } from './Searchable.stories'
export { Sentiments } from './Sentiments.stories'
export { TriggerMethod } from './TriggerMethod.stories'
export { WithModal } from './WithModal.stories'
