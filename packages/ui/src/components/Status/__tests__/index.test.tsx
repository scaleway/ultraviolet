import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Status, statusSentiments } from '..'

describe('Status', () => {
  test.each(statusSentiments)('renders correctly with type="%s"', sentiment =>
    shouldMatchEmotionSnapshot(<Status sentiment={sentiment} />),
  )

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(<Status sentiment="success" animated />))

  test(`render with className`, () =>
    shouldMatchEmotionSnapshot(<Status sentiment="success" className="test" />))
})
