import type { Meta } from '@storybook/react-vite'
import { StepList } from '..'

export default {
  component: StepList,
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
  title: 'Components/Data Display/StepList',
} as Meta

export { BulletIcon } from './BulletIcon.stories'
export { Disabled } from './Disabled.stories'
export { Playground } from './Playground.stories'
export { Sentiment } from './Sentiment.stories'
export { Sizes } from './Sizes.stories'
