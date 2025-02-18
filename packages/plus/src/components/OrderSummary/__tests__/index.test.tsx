import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { OrderSummary } from '..'

describe('OrderSummary', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(<OrderSummary />))
})
