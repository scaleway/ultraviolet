import type { Meta } from '@storybook/react-vite'
import { GoogleLogo } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: GoogleLogo,
  title: 'Icons/Logo',
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
export { List } from './List.stories'
