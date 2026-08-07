import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { DownloadIcon } from '@ultraviolet/icons'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { VisuallyHidden } from '..'

type TestElement = HTMLElement | SVGElement

/**
 * Can't use `.toBeVisible` since it checks if it:
 * - Is present in the DOM;
 * - Doesn’t have the display CSS property set to none;
 * - Doesn’t have the opacity CSS property set to 0;
 * - Doesn’t have the visibility CSS property set to hidden/collapse;
 * -Doesn’t have the aria-hidden attribute set to true;
 *
 * None of this is true in `VisuallyHidden`. So we check if the style is correctly applied instead.
 *
 * For visibility, after focus we assert the element receives focus; CSS :focus rules
 * are not reliably reflected in jsdom computed styles, so testing focus is simpler
 */
const expectVisuallyHidden = (element: TestElement) => {
  const style = window.getComputedStyle(element)

  expect(style.position).toBe('absolute')
  expect(style.width).toBe('1px')
  expect(style.height).toBe('1px')
  expect(style.overflow).toBe('hidden')
  expect(style.whiteSpace).toBe('nowrap')
  expect(style.borderTopWidth).toBe('0px')
  expect(style.paddingTop).toBe('0px')
}

describe('visuallyHidden', () => {
  it('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden>hidden</VisuallyHidden>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not be visible', () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden>hidden</VisuallyHidden>)

    const element = screen.getByText('hidden', { selector: 'span' })
    expectVisuallyHidden(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('render correct html element', () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden as="button">hidden</VisuallyHidden>)

    const element = screen.getByRole('button', { name: 'hidden' })

    expect(element).toBeInTheDocument()
    expectVisuallyHidden(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should be visible when focusable (tabIndex)', async () => {
    const { asFragment } = renderWithTheme(<VisuallyHidden tabIndex={0}>hidden</VisuallyHidden>)

    const element = screen.getByText('hidden', { selector: 'span' })
    expectVisuallyHidden(element)

    await userEvent.tab()
    await waitFor(() => expect(element).toHaveFocus())

    expect(asFragment()).toMatchSnapshot()
  })

  it('should be visible when it is a focusable element', async () => {
    const onClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <VisuallyHidden as="button" onClick={onClick}>
        hidden
      </VisuallyHidden>,
    )

    const button = screen.getByRole('button', { name: 'hidden' })
    expectVisuallyHidden(button)

    await userEvent.tab()
    await waitFor(() => expect(button).toHaveFocus())

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should be visible when it is has focusable element', async () => {
    const { asFragment } = renderWithTheme(
      <VisuallyHidden>
        <button type="button">click</button>
      </VisuallyHidden>,
    )

    const button = screen.getByRole('button', { name: 'click' })
    const wrapper = button.closest('span')

    expect(wrapper).toBeInstanceOf(HTMLSpanElement)
    expectVisuallyHidden(wrapper as HTMLSpanElement)

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
