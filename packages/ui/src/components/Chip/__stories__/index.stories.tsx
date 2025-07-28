import type { Meta } from '@storybook/react-vite'
import { Chip } from '..'

export default {
  component: Chip,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  subcomponents: {
    'Chip.Icon': Chip.Icon,
  },
  title: 'Components/Badges/Chip',
} as Meta<typeof Chip>

export { Disabled } from './Disabled.stories'
export { Groups } from './Groups.stories.tsx'
export { Icons } from './Icons.stories'
export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
