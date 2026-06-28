import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LockIcon } from '@ultraviolet/icons/LockIcon'
import { renderWithTheme } from '@utils/test'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Tag } from '..'

let writeTextMock: ReturnType<typeof vi.fn>

describe('tag', () => {
  beforeEach(() => {
    writeTextMock = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {})
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {})
  })

  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(<Tag>test</Tag>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly neutral', () => {
    const { asFragment } = renderWithTheme(<Tag sentiment="neutral">test</Tag>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(<Tag disabled>test</Tag>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly colored', () => {
    const { asFragment } = renderWithTheme(<Tag sentiment="primary">test</Tag>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with icon', () => {
    const { asFragment } = renderWithTheme(
      <Tag>
        <LockIcon />
        test
      </Tag>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with isLoading', () => {
    const { asFragment } = renderWithTheme(<Tag isLoading>test</Tag>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with onClose', async () => {
    const onClose = vi.fn()
    const { asFragment } = renderWithTheme(<Tag onClose={onClose}>test</Tag>)

    const closeButton = screen.getByRole('button', { name: 'Close tag' })
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  it('works correctly with copiable', async () => {
    const { asFragment } = renderWithTheme(<Tag copiable>test</Tag>)

    const tag = screen.getByRole('button', { name: 'test' })

    await userEvent.click(tag)
    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith('test')

    expect(asFragment()).toMatchSnapshot()
  })

  it('works correctly with copiable - number children', async () => {
    const { asFragment } = renderWithTheme(<Tag copiable>3</Tag>)

    const tag = screen.getByRole('button', { name: '3' })

    await userEvent.click(tag)

    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith('3')

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not close with onClose and disabled', async () => {
    const onClose = vi.fn()
    const { asFragment } = renderWithTheme(
      <Tag onClose={onClose} disabled>
        test
      </Tag>,
    )

    const closeButton = screen.getByRole('button', { name: 'Close tag' })
    await userEvent.click(closeButton)

    expect(onClose).not.toHaveBeenCalled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not copy with copiable and disabled', async () => {
    const { asFragment } = renderWithTheme(
      <Tag copiable disabled>
        test
      </Tag>,
    )

    const tag = screen.getByRole('button', { name: 'test' })

    await userEvent.click(tag)

    expect(writeTextMock).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with copiable and copy button', () => {
    const { asFragment } = renderWithTheme(
      <Tag copiable copyButton>
        test
      </Tag>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with code variant', () => {
    const { asFragment } = renderWithTheme(<Tag variant="code">test</Tag>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with key-value variant', () => {
    const { asFragment } = renderWithTheme(<Tag keyValue={{ key: 'key', value: 'value' }} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with onClose and key-value', async () => {
    const onClose = vi.fn()
    const { asFragment } = renderWithTheme(<Tag onClose={onClose} keyValue={{ key: 'myKey', value: 'myValue' }} />)

    const closeButton = screen.getByRole('button', { name: 'Close tag' })
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  it('works correctly with copiable and key-value', async () => {
    const { asFragment } = renderWithTheme(<Tag copiable keyValue={{ key: 'myKey', value: 'myValue' }} />)

    const tag = screen.getByRole('button', { name: 'myKey myValue' })

    await userEvent.click(tag)
    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith('myKey:myValue')

    expect(asFragment()).toMatchSnapshot()
  })
})
