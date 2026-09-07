import type { Meta } from '@storybook/react-vite'
import { FAQ } from '..'

export default {
  component: FAQ,
  title: 'Compositions/FAQ',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
