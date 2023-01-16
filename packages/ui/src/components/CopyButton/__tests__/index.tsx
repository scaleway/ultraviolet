import userEvent from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import { CopyButton, SIZES } from '../index'

describe('CopyButton', () => {
  beforeAll(() => {
    let data = ''

    // @ts-expect-error we are voluntarily based on an older browser spec
    window.clipboardData = {
      getData: jest.fn(() => data),
      setData: jest.fn((_, val: string) => {
        data = val
      }),
    }
  })

  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<CopyButton value="Test" />))

  Object.keys(SIZES).forEach(size => {
    test(`renders correctly variant ${size}`, () =>
      shouldMatchEmotionSnapshot(
        <CopyButton value="Test" size={size as keyof typeof SIZES} />,
      ))
  })
  ;(['primary', 'neutral'] as const).forEach(variant => {
    test(`renders correctly variant ${variant}`, () =>
      shouldMatchEmotionSnapshot(<CopyButton value="Test" variant={variant} />))
  })

  test('renders correctly with no border', () =>
    shouldMatchEmotionSnapshot(<CopyButton value="Test" noBorder />))

  test('renders correctly with custom copy text', () =>
    shouldMatchEmotionSnapshot(<CopyButton value="Test" copyText="Copy me" />))

  test('renders correctly with custom copied text', () =>
    shouldMatchEmotionSnapshot(
      <CopyButton value="Test" copiedText="Copied!" />,
    ))

  test('renders correctly with custom class name', () =>
    shouldMatchEmotionSnapshot(
      <CopyButton value="Test" className="custom-class" />,
    ))

  it('should renders correctly with a complex children', async () => {
    const node = renderWithTheme(<CopyButton value="test" />)

    await userEvent.click(node.getByRole('button'))
    // @ts-expect-error we are voluntarily based on an older browser spec
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    expect(window.clipboardData.getData()).toBe('test')
  })
})
