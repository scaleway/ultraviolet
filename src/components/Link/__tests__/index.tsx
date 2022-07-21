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

  test(`render correctly with to props`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Link variant="primary" to="/" iconPosition="left">
          Hello
        </Link>
        <Link variant="primary" to="/" iconPosition="right">
          Hello
        </Link>
        <Link variant="primary" to="/" iconPosition="right" target="_blank">
          Hello
        </Link>
        <Link variant="primary" to="/" iconPosition="left" target="_blank">
          Hello
        </Link>
      </>,
    ))

  test(`render correctly with bad variant`, () =>
    shouldMatchEmotionSnapshot(
      // @ts-expect-error Use a wrong variant
      <Link variant="wrong" to="/">
        Hello
      </Link>,
    ))

  test(`render correctly with sizes`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Link size="large" to="/">
          Hello
        </Link>
        ,
        <Link size="small" to="/">
          Hello
        </Link>
        ,
      </>,
    ))
})
