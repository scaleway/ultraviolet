import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'
import { CopyButton } from '../index'

describe('CopyButton', () => {
  beforeAll(() => {
    let data = ''

    // @ts-expect-error we are voluntarily based on an older browser spec
    window.clipboardData = {
      getData: vi.fn(() => data),
      setData: vi.fn((_, val: string) => {
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

  test('renders correctly with children', () =>
    shouldMatchEmotionSnapshot(<CopyButton value="Test">Copy test</CopyButton>))

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
    const onCopy = vi.fn(() => {})

    renderWithTheme(<CopyButton value="test" onCopy={onCopy} />)

    await userEvent.click(screen.getByRole('button'))
    expect(onCopy).toBeCalledTimes(1)
    // @ts-expect-error we are voluntarily based on an older browser spec

    expect(window.clipboardData.getData()).toBe('test')
  })
})
