import { Chip } from '..'

import type { Meta } from '@storybook/react-vite'

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
} as Meta<typeof Chip>

export { Playground } from './Playground.stories'
export { Icons } from './Icons.stories'
export { Groups } from './Groups.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
