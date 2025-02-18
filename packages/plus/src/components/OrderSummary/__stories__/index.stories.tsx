import type { Meta } from '@storybook/react'
import { OrderSummary } from '..'

export default {
  component: OrderSummary,
  title: 'Plus/Compositions/OrderSummary',
} satisfies Meta

export { Playground } from './Playground.stories'
export { WithTimeUnit } from './WithTimeUnit.stories'
export { Commitment } from './Commitment.stories'
export { OverallDiscount } from './OverallDiscount.stories'
export { Footer } from './Footer.stories'
