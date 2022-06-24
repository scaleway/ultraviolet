import Link from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { Color, SENTIMENTS } from '../../../theme'

describe('Link', () => {
  test(`render correctly with no variant`, () =>
    shouldMatchEmotionSnapshot(<Link to="/">Hello</Link>))

  describe('variant', () => {
    test.each(SENTIMENTS.map(variant => [`render ${variant}`, variant]))(
      '%s',
      (_, variant) =>
        shouldMatchEmotionSnapshot(
          <Link to="/" variant={variant as Color}>
            Hello
          </Link>,
        ),
    )
  })

  test(`render correctly with target blank`, () =>
    shouldMatchEmotionSnapshot(
      <Link to="/" variant="primary" target="_blank">
        Hello
      </Link>,
    ))

  test(`render correctly with to props`, () =>
    shouldMatchEmotionSnapshot(
      <Link variant="primary" to="/">
        Hello
      </Link>,
    ))
})
