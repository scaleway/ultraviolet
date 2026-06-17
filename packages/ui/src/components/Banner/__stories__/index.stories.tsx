import type { Meta } from '@storybook/react-vite'
import { Banner } from '..'

export default {
  component: Banner,
  title: 'UI/Other/Banner',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Banner>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Sizes } from './Sizes.stories'
export { Directions } from './Directions.stories'
