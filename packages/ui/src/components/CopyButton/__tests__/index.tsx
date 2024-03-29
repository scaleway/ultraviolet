import { beforeAll, describe, expect, it, jest, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import { CopyButton } from '../index'

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
  ;(['xsmall', 'small', 'medium', 'large'] as const).forEach(size => {
    test(`renders correctly sentiment ${size}`, () =>
      shouldMatchEmotionSnapshot(<CopyButton value="Test" size={size} />))
  })
  ;(['primary', 'neutral'] as const).forEach(sentiment => {
    test(`renders correctly sentiment ${sentiment}`, () =>
      shouldMatchEmotionSnapshot(
        <CopyButton value="Test" sentiment={sentiment} />,
      ))
  })

  test('renders correctly with no border', () =>
    shouldMatchEmotionSnapshot(<CopyButton value="Test" noBorder />))

  test('renders correctly with bordered', () =>
    shouldMatchEmotionSnapshot(<CopyButton value="Test" bordered />))

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
    renderWithTheme(<CopyButton value="test" />)

    await userEvent.click(screen.getByRole('button'))
    // @ts-expect-error we are voluntarily based on an older browser spec
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    expect(window.clipboardData.getData()).toBe('test')
  })
})
