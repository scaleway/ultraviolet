import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MoonIcon, SunIcon } from '@ultraviolet/icons'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SwitchButton } from '..'

describe('SwitchButton', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton name="test" onChange={() => {}} value="left">
        <SwitchButton.Option value="left">Left</SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    ))
  test('renders correctly medium', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton name="test" onChange={() => {}} value="left" size="medium">
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
    let resizeCallback: ResizeObserverCallback = () => {}

    ResizeObserver = vi.fn((cb: ResizeObserverCallback) => {
      resizeCallback = cb

      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      }
    }) as unknown as typeof ResizeObserver

    const { asFragment } = renderWithTheme(
      <SwitchButton name="test" onChange={() => {}} value="right">
        <SwitchButton.Option value="left">Left </SwitchButton.Option>
        <SwitchButton.Option value="right">Right</SwitchButton.Option>
      </SwitchButton>,
    )

    const buttonLeft = screen.getByTestId('switch-button-left')
    Object.defineProperty(buttonLeft, 'offsetWidth', {
      configurable: true,
      value: 1000,
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
        value="left"
        tooltip="tooltip"
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
        value="left"
        tooltip="tooltip"
      >
        <SwitchButton.Option value="left" disabled tooltip="This is disabled">
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
        value="left"
        sentiment="neutral"
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
        value="left"
        tooltip="tooltip"
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
