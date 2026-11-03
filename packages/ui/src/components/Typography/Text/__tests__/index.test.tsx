import { textVariants } from '@ultraviolet/themes'
import { MockResizeObserver, renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Text } from '..'

describe('text', () => {
  it.each(textVariants)('renders correctly with type="%s"', variant =>
    shouldMatchSnapshot(
      <Text as="div" variant={variant}>
        {variant}
      </Text>,
    ),
  )

  it('renders correctly with tooltip', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" oneLine variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>,
    ))

  it('renders correctly with placement', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" placement="end" variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>,
    ))

  it('renders correctly with dir', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" dir="rtl" oneLine variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>,
    ))

  it('renders correctly with htmlFor', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" htmlFor="test" variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>,
    ))

  it('with multiple nested children renders correctly', () =>
    shouldMatchSnapshot(
      <Text as="div" variant="body">
        Lorem
        <span>Ipsum</span>
        <Text as="span" variant="heading">
          <span>Dolor</span>
        </Text>
        Sit
      </Text>,
    ))

  it('with prominence stronger on non neutral', () =>
    shouldMatchSnapshot(
      <Text as="div" prominence="stronger" sentiment="danger" variant="body">
        Lorem Ipsum
      </Text>,
    ))
  it('with italic', () =>
    shouldMatchSnapshot(
      <Text as="div" italic variant="body">
        Lorem Ipsum
      </Text>,
    ))
  it('with underline', () =>
    shouldMatchSnapshot(
      <Text as="div" underline variant="body">
        Lorem Ipsum
      </Text>,
    ))

  it('with disabled', () =>
    shouldMatchSnapshot(
      <Text as="div" disabled variant="body">
        Lorem Ipsum
      </Text>,
    ))

  it('with monochrome', () =>
    shouldMatchSnapshot(
      <Text as="div" sentiment="black" variant="body">
        Lorem Ipsum
      </Text>,
    ))

  it('renders correctly with whiteSpace', () =>
    shouldMatchSnapshot(
      <Text as="div" variant="body" whiteSpace="nowrap">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </Text>,
    ))

  it('keeps the text element as the tooltip trigger when the text overflows', () => {
    // The Tooltip trigger must be the text element itself: adding a wrapper when the tooltip
    // opens changes the measured width, which makes the overflow state (and so the wrapper) flip forever.
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
    vi.spyOn(Element.prototype, 'scrollWidth', 'get').mockReturnValue(100)
    vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(50)

    const { container } = renderWithTheme(
      <Text as="p" oneLine variant="body">
        Lorem ipsum dolor sit amet
      </Text>,
    )

    expect(container.querySelector('p')?.parentElement).toBe(container.firstElementChild)
    expect(container.querySelector('p')).toHaveAttribute('tabindex', '0')

    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })
})
