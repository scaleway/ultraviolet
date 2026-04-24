import { Banner } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Banner,
  title: 'UI/Other/Banner',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof Banner>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Sizes } from './Sizes.stories'
export { Directions } from './Directions.stories'
