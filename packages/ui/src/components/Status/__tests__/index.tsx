import Status, { statusVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Status', () => {
  test.each(statusVariants)('renders correctly with type="%s"', variant =>
    shouldMatchEmotionSnapshot(<Status variant={variant} />),
  )

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(<Status variant="success" animated />))

  test(`render with className`, () =>
    shouldMatchEmotionSnapshot(<Status variant="success" className="test" />))
})
