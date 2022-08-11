import ReactDOM from 'react-dom'
import Text, { textVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

// TODO: Remove any but IDK what we can put here
jest.mock(
  '../../Tooltip',
  () =>
    ({ children }: { [x: string]: unknown; children: unknown }) =>
      children,
)

describe('Text', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  beforeEach(() => {
    ;(ReactDOM.createPortal as unknown) = jest.fn(
      element => element as unknown,
    ) as unknown
  })

  afterEach(() => {
    ;(ReactDOM.createPortal as jest.Mock).mockClear()
  })

  test.each(textVariants)('renders correctly with type="%s"', variant =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant={variant}>
        {variant}
      </Text>,
    ),
  )

  test(`renders correctly with tooltip`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" variant="body" oneLine>
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`with multiple nested chidldren renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body">
        Lorem
        <span>Ipsum</span>
        <Text variant="heading" as="span">
          <span>Dolor</span>
        </Text>
        Sit
      </Text>,
    ))

  test(`with prominence stronger on non neutral`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" prominence="stronger" color="danger">
        Lorem Ipsum
      </Text>,
    ))
  test(`with italic`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" italic>
        Lorem Ipsum
      </Text>,
    ))
  test(`with underline`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" underline>
        Lorem Ipsum
      </Text>,
    ))

  test(`with disabled`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" disabled>
        Lorem Ipsum
      </Text>,
    ))
})
