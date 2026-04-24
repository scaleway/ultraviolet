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
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof Chip>

export { Playground } from './Playground.stories'
export { Icons } from './Icons.stories'
export { Groups } from './Groups.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
