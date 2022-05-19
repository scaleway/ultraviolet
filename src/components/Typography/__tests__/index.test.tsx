import ReactDOM from 'react-dom'
import Typography, { typographyVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

// TODO: Remove any but IDK what we can put here
jest.mock(
  '../../Tooltip',
  () =>
    ({
      children,
      ...props
    }: {
      [x: string]: unknown
      children: (props: { [x: string]: unknown }) => unknown
    }) =>
      children(props),
)

describe('Typography', () => {
  beforeEach(() => {
    ;(ReactDOM.createPortal as unknown) = jest.fn(
      element => element as unknown,
    ) as unknown
  })

  afterEach(() => {
    ;(ReactDOM.createPortal as jest.Mock).mockClear()
  })

  typographyVariants.forEach(variant => {
    test(`variant "${variant}" renders correctly`, () =>
      shouldMatchEmotionSnapshot(
        <Typography variant={variant}>{variant}</Typography>,
      ))
  })

  typographyVariants.forEach(variant => {
    test(`variant "${variant}" with tooltip renders correctly`, () =>
      shouldMatchEmotionSnapshot(
        <Typography variant={variant} ellipsis width={100}>
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Typography>,
      ))
  })

  test(`with maxLines renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <Typography variant="bodyB" maxLines={2}>
        Hello
      </Typography>,
    ))

  test(`with multiple nested chidldren renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <Typography variant="bodyB" maxLines={2}>
        Lorem
        <span>Ipsum</span>
        <Typography variant="title" as="span">
          <span>Dolor</span>
        </Typography>
        Sit
      </Typography>,
    ))
})
