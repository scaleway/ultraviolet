import type { Meta } from '@storybook/react-vite'
import { GoogleLogo } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: GoogleLogo,
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
  title: 'Icons/Logo',
} as Meta

export { List } from './List.stories'
export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
