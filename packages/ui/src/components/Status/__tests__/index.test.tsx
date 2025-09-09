import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Status } from '..'
import { SENTIMENTS } from '../constant'

describe('status', () => {
  test.each(SENTIMENTS)('renders correctly with type="%s"', sentiment =>
    shouldMatchEmotionSnapshot(<Status sentiment={sentiment} />),
  )

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(<Status animated sentiment="success" />))

  test(`render with className`, () =>
    shouldMatchEmotionSnapshot(<Status className="test" sentiment="success" />))
})
