import type { Meta } from '@storybook/react-vite'
import { SteppedListCard } from '..'

export default {
  component: SteppedListCard,
  title: 'Plus/Compositions/SteppedListCard',
} satisfies Meta

export { OnClickHide } from './OnClickHide.stories'
export { Playground } from './Playground.stories'
export { WithoutToggleButton } from './WithoutToggleButton.stories'
