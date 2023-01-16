import type { Meta } from '@storybook/react'
import { Description } from '..'

export default {
  component: Description,
  parameters: {
    docs: {
      description: {
        component:
          'Terms and descriptions with `dl`, `dt` and `dd` native html tag.',
      },
    },
  },
  title: 'Components/Data Display/Description',
  argTypes: {
    inline: {
      control: 'boolean',
    },
    userSelect: {
      control: 'boolean',
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Inline } from './Inline.stories'
export { Selectable } from './Selectable.stories'
