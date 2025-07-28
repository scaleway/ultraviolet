import type { Meta } from '@storybook/react-vite'
import { AddressIcon } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: AddressIcon,
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
  title: 'Icons/Icon',
} as Meta

export { List } from './List.stories'
export { Playground } from './Playground.stories'
export { Sentiment } from './Sentiment.stories'
export { Size } from './Size.stories'
