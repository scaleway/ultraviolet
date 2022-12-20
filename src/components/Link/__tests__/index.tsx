import Link from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { SENTIMENTS } from '../../../theme'

describe('Link', () => {
  test(`render correctly with no variant`, () =>
    shouldMatchEmotionSnapshot(<Link href="/">Hello</Link>))

  describe('variant', () => {
    test.each(SENTIMENTS.map(variant => [`render ${variant}`, variant]))(
      '%s',
      (_, variant) =>
        shouldMatchEmotionSnapshot(
          <Link href="/" variant={variant}>
            Hello
          </Link>,
        ),
    )
  })

  test(`render correctly with target blank`, () =>
    shouldMatchEmotionSnapshot(
      <Link href="/" variant="primary" target="_blank">
        Hello
      </Link>,
    ))

  test(`render correctly with href props`, () =>
    shouldMatchEmotionSnapshot(
      <Link variant="primary" href="/">
        Hello
      </Link>,
    ))

  test(`render correctly with href props`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Link variant="primary" href="/" iconPosition="left">
          Hello
        </Link>
        <Link variant="primary" href="/" iconPosition="right">
          Hello
        </Link>
        <Link variant="primary" href="/" iconPosition="right" target="_blank">
          Hello
        </Link>
        <Link variant="primary" href="/" iconPosition="left" target="_blank">
          Hello
        </Link>
      </>,
    ))

  test(`render correctly with bad variant`, () =>
    shouldMatchEmotionSnapshot(
      // @ts-expect-error Use a wrong variant
      <Link variant="wrong" href="/">
        Hello
      </Link>,
    ))

  test(`render correctly with sizes`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Link size="large" href="/">
          Hello
        </Link>
        ,
        <Link size="small" href="/">
          Hello
        </Link>
        ,
      </>,
    ))
})
