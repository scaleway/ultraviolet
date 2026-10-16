import type { Meta } from '@storybook/react-vite'
import { Chip } from '..'

export default {
  component: Chip,
  subcomponents: {
    'Chip.Icon': Chip.Icon,
  },
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'UI/Badges/Chip',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
} as Meta<typeof Chip>

export { Playground } from './Playground.stories'
export { Icons } from './Icons.stories'
export { Closable } from './Closable.stories'
export { Groups } from './Groups.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
