import type { Meta } from '@storybook/react-vite'
import { FAQ } from '..'

export default {
  component: FAQ,
  title: 'Compositions/FAQ',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
