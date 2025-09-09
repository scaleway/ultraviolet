import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MoonIcon, SunIcon } from '@ultraviolet/icons'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'
import { SwitchButton } from '..'

let resizeCallback: ResizeObserverCallback = () => {}

describe('switchButton', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    })
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {})
  })

  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton name="test" onChange={() => {}} value="left">
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))
  test('renders correctly medium', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton name="test" onChange={() => {}} size="medium" value="left">
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))

  test('renders correctly with right value', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton name="test" onChange={() => {}} value="right">
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))

  test('renders correctly with children changing', () => {
    ResizeObserver = vi.fn((cb: ResizeObserverCallback) => {
      resizeCallback = cb

      return {
        disconnect: vi.fn(),
        observe: vi.fn(),
      }
    }) as unknown as typeof ResizeObserver

    const { asFragment } = renderWithTheme(
      <SwitchButton name="test" onChange={() => {}} value="right">
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    )

    const buttonLeft = screen.getByTestId('switch-button-left')

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 100,
    })

    resizeCallback(
      [{ target: buttonLeft } as unknown as ResizeObserverEntry],
      {} as ResizeObserver,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        tooltip="tooltip"
        value="left"
      >
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))

  test('renders with disabled and tooltip on SwitchButton.Option', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        tooltip="tooltip"
        value="left"
      >
        <SwitchButton.Option disabled tooltip="This is disabled" value="left">
          Left
        </SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))

  test('renders neutral', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        sentiment="neutral"
        value="left"
      >
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))

  test('renders with icons', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        tooltip="tooltip"
        value="left"
      >
        <SwitchButton.Option value="left">
          <MoonIcon />
        </SwitchButton.Option>
        <SwitchButton.Option value="right">
          <SunIcon />
        </SwitchButton.Option>
      </SwitchButton>,
    ))

  test('renders with on change', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SwitchButton name="test" onChange={onChange} value="left">
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    )

    const rightButton = screen.getByTestId('switch-button-right')

    await userEvent.click(rightButton)
  })

  test('throws error when using button outside of context', async () => {
    expect(() =>
      renderWithTheme(
        <SwitchButton.Option value="left">Left</SwitchButton.Option>,
      ),
    ).toThrowError('SwitchButton.Option should be used inside a SwitchButton')
  })
})
