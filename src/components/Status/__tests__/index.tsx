import Status, { statusVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Status', () => {
  test.each(statusVariants)('renders correctly with type="%s"', variant =>
    shouldMatchEmotionSnapshot(<Status variant={variant} />),
  )

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(<Status variant="success" animated />))
})
