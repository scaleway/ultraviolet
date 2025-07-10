import type { Meta } from '@storybook/react-vite'
import { Banner } from '..'

export default {
  component: Banner,
  title: 'Components/Other/Banner',
} as Meta<typeof Banner>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Sizes } from './Sizes.stories'
export { Directions } from './Directions.stories'
