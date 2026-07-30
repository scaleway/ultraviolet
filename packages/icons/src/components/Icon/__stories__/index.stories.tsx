import type { Meta } from '@storybook/react-vite'
import { AddressIcon } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: AddressIcon,
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: true,
      understandable: true,
      robust: false,
    },
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
  title: 'Icons/Icon',
} as Meta

export { Playground } from './Playground.stories'
export { List } from './List.stories'
export { Size } from './Size.stories'
export { Sentiment } from './Sentiment.stories'
