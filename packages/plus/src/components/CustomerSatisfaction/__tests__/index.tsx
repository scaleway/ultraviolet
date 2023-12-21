import { describe, it, jest } from '@jest/globals'
import { CustomerSatisfaction } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('CustomerSatisfaction', () => {
  it('should work with parameters', () =>
    shouldMatchEmotionSnapshot(
      <CustomerSatisfaction value={4} onChange={jest.fn<any>()} />,
    ))
})
