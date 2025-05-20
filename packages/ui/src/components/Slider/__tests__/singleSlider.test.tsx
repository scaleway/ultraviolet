import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Slider } from '..'

const options = [
  { label: '1 Mb', value: 1 },
  { label: '30MB', value: 30 },
]

const options2 = [{ value: 1 }, { value: 30 }]

describe('Single slider', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    })
  })

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {})
  })

  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" helper="helper" />,
    )
  })

  test('renders correctly required', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" required />,
    )
  })

  test('renders correctly suffix string', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" suffix="%" />,
    )
  })

  test('renders correctly suffix complex', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={1}
        name="Name"
        label="Label"
        suffix={<button type="button">suffix</button>}
      />,
    )
  })

  test('renders correctly suffix string input', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" suffix="%" input />,
    )
  })

  test('renders correctly prefix', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" prefix="%" />,
    )
  })

  test('renders correctly direction row', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" direction="row" />,
    )
  })

  test('renders correctly direction row with input', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" direction="row" input />,
    )
  })

  test('renders correctly with value < min', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={-1} name="Name" label="Label" min={10} />,
    )
  })

  test('renders correctly with value > max', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={90} name="Name" label="Label" max={10} />,
    )
  })

  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" disabled />,
    )
  })

  test('renders correctly error boolean', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" error helper="helper" />,
    )
  })

  test('renders correctly error boolean and helper', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" error helper="helper" />,
    )
  })

  test('renders correctly error string', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" error="error" />,
    )
  })
  test('renders correctly error string and helper', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={1}
        name="Name"
        label="Label"
        error="error"
        helper="helper"
      />,
    )
  })

  test('renders correctly input', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" input />,
    )
  })

  test('renders correctly custom tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" tooltip="tooltip" />,
    )
  })

  test('renders correctly default tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" tooltip />,
    )
  })

  test('renders correctly with custom ticks', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" options={options} unit="%" />,
    )
  })

  test('renders correctly with default ticks without label', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={1}
        name="Name"
        label="Label"
        options={options2}
        unit="%"
      />,
    )
  })

  test('renders correctly min max', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" min={1} max={10} />,
    )
  })

  test('renders correctly step', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={1} name="Name" label="Label" step={0.5} />,
    )
  })

  test('handles correctly onChange with min and max', async () => {
    const onChange: (value: number) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={3}
        input
        max={10}
        min={2}
      />,
    )
    const slider = screen.getByRole<HTMLInputElement>('slider')
    const input = screen.getByTestId<HTMLInputElement>('slider-input')
    expect(slider.value).toBe('3')
    await userEvent.type(input, '5')
    await userEvent.click(slider)
    expect(slider.value).toBe('10')

    await userEvent.clear(input)
    await userEvent.click(slider)
    expect(slider.value).toBe('2')

    await userEvent.clear(input)
    await userEvent.type(input, '1')
    await userEvent.click(slider)
    expect(slider.value).toBe('2')

    fireEvent.change(slider, { target: { value: '3' } })
    expect(slider.value).toBe('3')

    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly with custom scale', () => {
    const onChange: (value: number) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={3}
        input
        options={[
          { label: '3', value: 3 },
          { label: '5', value: 5 },
          { label: '6', value: 6 },
          { label: '10', value: 10 },
        ]}
      />,
    )
    const slider = screen.getByRole<HTMLInputElement>('slider')
    const value = screen.getByTestId('slider-value')
    expect(slider.value).toBe('3')
    expect(value).toHaveTextContent('10')

    fireEvent.change(slider, { target: { value: '2' } })
    expect(slider.value).toBe('2')
    expect(value).toHaveTextContent('6')

    expect(asFragment()).toMatchSnapshot()
  })
})
