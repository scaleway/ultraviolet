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
      <div style={{ width: '100px' }}>
        <Text as="div" variant="Body" oneLine>
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`with multiple nested chidldren renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="Body">
        Lorem
        <span>Ipsum</span>
        <Text variant="Heading" as="span">
          <span>Dolor</span>
        </Text>
        Sit
      </Text>,
    ))
})
