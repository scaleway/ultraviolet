import type { Meta } from '@storybook/react-vite'
import { SteppedListCard } from '..'

export default {
  component: SteppedListCard,
  title: 'Compositions/SteppedListCard',
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
export { OnClickHide } from './OnClickHide.stories'
export { IconStep } from './IconStep.stories'
export { NextStep } from './NextStep.stories'
export { WithoutToggleButton } from './WithoutToggleButton.stories'
