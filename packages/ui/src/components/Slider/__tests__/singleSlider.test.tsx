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

describe('single slider', () => {
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
      <Slider helper="helper" label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly required', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" required value={1} />,
    )
  })

  test('renders correctly suffix string', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" suffix="%" value={1} />,
    )
  })

  test('renders correctly suffix complex', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        label="Label"
        name="Name"
        suffix={<button type="button">suffix</button>}
        value={1}
      />,
    )
  })

  test('renders correctly suffix string input', () => {
    shouldMatchEmotionSnapshot(
      <Slider input label="Label" name="Name" suffix="%" value={1} />,
    )
  })

  test('renders correctly prefix', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" prefix="%" value={1} />,
    )
  })

  test('renders correctly direction row', () => {
    shouldMatchEmotionSnapshot(
      <Slider direction="row" label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly direction row with input', () => {
    shouldMatchEmotionSnapshot(
      <Slider direction="row" input label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly with value < min', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" min={10} name="Name" value={-1} />,
    )
  })

  test('renders correctly with value > max', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" max={10} name="Name" value={90} />,
    )
  })

  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(
      <Slider disabled label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly error boolean', () => {
    shouldMatchEmotionSnapshot(
      <Slider error helper="helper" label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly error boolean and helper', () => {
    shouldMatchEmotionSnapshot(
      <Slider error helper="helper" label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly error string', () => {
    shouldMatchEmotionSnapshot(
      <Slider error="error" label="Label" name="Name" value={1} />,
    )
  })
  test('renders correctly error string and helper', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        error="error"
        helper="helper"
        label="Label"
        name="Name"
        value={1}
      />,
    )
  })

  test('renders correctly input', () => {
    shouldMatchEmotionSnapshot(
      <Slider input label="Label" name="Name" value={1} />,
    )
  })

  test('renders correctly custom tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" tooltip="tooltip" value={1} />,
    )
  })

  test('renders correctly default tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" tooltip value={1} />,
    )
  })

  test('renders correctly with custom ticks', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" options={options} unit="%" value={1} />,
    )
  })

  test('renders correctly with default ticks without label', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        label="Label"
        name="Name"
        options={options2}
        unit="%"
        value={1}
      />,
    )
  })

  test('renders correctly min max', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" max={10} min={1} name="Name" value={1} />,
    )
  })

  test('renders correctly step', () => {
    shouldMatchEmotionSnapshot(
      <Slider label="Label" name="Name" step={0.5} value={1} />,
    )
  })

  test('handles correctly onChange with min and max', async () => {
    const onChange: (value: number) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        data-testid="slider"
        input
        max={10}
        min={2}
        name="slider"
        onChange={onChange}
        value={3}
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
        data-testid="slider"
        input
        name="slider"
        onChange={onChange}
        options={[
          { label: '3', value: 3 },
          { label: '5', value: 5 },
          { label: '6', value: 6 },
          { label: '10', value: 10 },
        ]}
        value={3}
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
