import type { Meta } from '@storybook/react-vite'
import { CustomerSatisfaction } from '..'

export default {
  component: CustomerSatisfaction,
  title: 'Compositions/CustomerSatisfaction',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
} as Meta

export { Playground } from './Playground.stories'
