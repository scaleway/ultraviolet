import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { DownloadIcon } from '@ultraviolet/icons'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { VisuallyHidden } from '..'

describe('visuallyHidden', () => {
  it('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden>hidden</VisuallyHidden>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not be visible', () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden>hidden</VisuallyHidden>)

    expect(screen.getByText('hidden', { selector: 'span' })).toBeVisuallyHidden()

    expect(asFragment()).toMatchSnapshot()
  })

  it('render correct html element', () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden as="button">hidden</VisuallyHidden>)

    expect(screen.getByRole('button', { name: 'hidden' })).toBeVisuallyHidden()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should be visible on focus when it IS a focusable element', async () => {
    const onClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <VisuallyHidden as="button" onClick={onClick}>
        hidden
      </VisuallyHidden>,
    )

    const button = screen.getByRole('button', { name: 'hidden' })
    expect(button).toBeVisuallyHidden()

    await userEvent.tab()
    await waitFor(() => expect(button).toHaveFocus())

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should be visible on focus when it HAS focusable element', async () => {
    const { asFragment } = renderWithTheme(
      <VisuallyHidden>
        <button type="button">click</button>
      </VisuallyHidden>,
    )

    const button = screen.getByRole('button', { name: 'click' })
    const wrapper = button.closest('span')

    expect(wrapper).toBeInstanceOf(HTMLSpanElement)
    expect(wrapper).toBeVisuallyHidden()

    await userEvent.tab()
    await waitFor(() => expect(button).toHaveFocus())

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work to label and describe elements', async () => {
    const { asFragment } = renderWithTheme(
      <>
        <button type="button">
          <DownloadIcon aria-hidden />
          <VisuallyHidden>download</VisuallyHidden>
        </button>
        <input aria-labelledby="example_label" aria-describedby="example_desc" />
        <VisuallyHidden id="example_label">label</VisuallyHidden>
        <VisuallyHidden id="example_desc">desc</VisuallyHidden>
      </>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAccessibleName('download')

    const input = screen.getByRole('textbox')
    expect(input).toHaveAccessibleName('label')
    expect(input).toHaveAccessibleDescription('desc')

    expect(asFragment()).toMatchSnapshot()
  })
})
