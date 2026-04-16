import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'

import { CopyButton } from '../index'

describe('copyButton', () => {
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
    shouldMatchSnapshot(<CopyButton value="Test" />))
  ;(['xsmall', 'small', 'medium', 'large'] as const).forEach(size => {
    test(`renders correctly sentiment ${size}`, () =>
      shouldMatchSnapshot(<CopyButton size={size} value="Test" />))
  })
  ;(['primary', 'neutral'] as const).forEach(sentiment => {
    test(`renders correctly sentiment ${sentiment}`, () =>
      shouldMatchSnapshot(<CopyButton sentiment={sentiment} value="Test" />))
  })

  test('renders correctly with bordered', () =>
    shouldMatchSnapshot(<CopyButton bordered value="Test" />))

  test('renders correctly with children', () =>
    shouldMatchSnapshot(<CopyButton value="Test">Copy test</CopyButton>))

  test('renders correctly with custom copy text', () =>
    shouldMatchSnapshot(<CopyButton copyText="Copy me" value="Test" />))

  test('renders correctly with custom copied text', () =>
    shouldMatchSnapshot(<CopyButton copiedText="Copied!" value="Test" />))

  test('renders correctly with custom class name', () =>
    shouldMatchSnapshot(<CopyButton className="custom-class" value="Test" />))

  it('should renders correctly with a complex children', async () => {
    const onCopy = vi.fn(() => {})
    const writeTextSpy = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined)

    renderWithTheme(<CopyButton onCopy={onCopy} value="test" />)

    await userEvent.click(screen.getByRole('button'))
    expect(onCopy).toHaveBeenCalledOnce()
    expect(writeTextSpy).toHaveBeenCalledWith('test')
  })

  it('should update clipboard text when value prop changes', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined)
    navigator.clipboard.writeText = writeTextSpy

    const { rerender } = renderWithTheme(<CopyButton value="initial text" />)

    const copyButton = screen.getByRole('button')
    await userEvent.click(copyButton)

    expect(writeTextSpy).toHaveBeenCalledWith('initial text')

    rerender(<CopyButton value="updated text" />)

    const copyButtonRerendered = screen.getByRole('button')
    await userEvent.click(copyButtonRerendered)
    expect(writeTextSpy).toHaveBeenCalledWith('updated text')
  })
})
