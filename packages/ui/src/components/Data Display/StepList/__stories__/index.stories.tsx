import type { Meta } from '@storybook/react-vite'
import { StepList } from '..'

export default {
  component: StepList,
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
  tags: ['experimental'],
  title: 'UI/Data Display/StepList',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Sentiment } from './Sentiment.stories'
export { Sizes } from './Sizes.stories'
export { BulletIcon } from './BulletIcon.stories'
export { ComplexChild } from './ComplexChildren.stories'
