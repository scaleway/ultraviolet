import type { Meta } from '@storybook/react'
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
  title: 'Components/Overlay/Menu',
  subcomponents: {
    'Menu.Item': Menu.Item,
  },
} as Meta<typeof Menu>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Borderless } from './Borderless.stories'
export { WithModal } from './WithModal.stories'
export { FunctionDisclosure } from './FunctionDisclosure.stories'
