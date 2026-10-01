import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { SENTIMENTS } from '../../../../theme'
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

  it('renders correctly', () => shouldMatchSnapshot(<CopyButton value="Test" />))
  it.each(['xsmall', 'small', 'medium', 'large'] as const)(`renders correctly sentiment %s`, size => {
    const { asFragment } = renderWithTheme(<CopyButton size={size} value="Test" />)

    expect(asFragment()).toMatchSnapshot()
  })
  it.each(SENTIMENTS)(`renders correctly sentiment %s`, sentiment => {
    const { asFragment } = renderWithTheme(<CopyButton sentiment={sentiment} value="Test" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with bordered', () => {
    const { asFragment } = renderWithTheme(<CopyButton bordered value="Test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with children', () => {
    const { asFragment } = renderWithTheme(<CopyButton value="Test">Copy test</CopyButton>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with custom copy text', () => {
    const { asFragment } = renderWithTheme(<CopyButton copyText="Copy me" value="Test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with custom copied text', () => {
    const { asFragment } = renderWithTheme(<CopyButton copiedText="Copied!" value="Test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with custom class name', () => {
    const { asFragment } = renderWithTheme(<CopyButton className="custom-class" value="Test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with a complex children', async () => {
    const onCopy = vi.fn(() => {})
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

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
