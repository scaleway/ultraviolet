import { SteppedListCard } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SteppedListCard,
  title: 'Compositions/SteppedListCard',
} satisfies Meta

export { Playground } from './Playground.stories'
export { OnClickHide } from './OnClickHide.stories'
export { IconStep } from './IconStep.stories'
export { NextStep } from './NextStep.stories'
export { WithoutToggleButton } from './WithoutToggleButton.stories'
