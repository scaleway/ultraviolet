import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Slider } from '..'

const options = [
  { label: '1 Mb', value: 1 },
  { label: '30MB', value: 30 },
]
const scale = [1, 2, 3, 4, 5, 10, 15, 20, 25]

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
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" helper="helper" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" required />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly suffix string', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" suffix="%" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly suffix complex', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={1}
        name="Name"
        label="Label"
        suffix={<button type="button">suffix</button>}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly suffix string input', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" suffix="%" input />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly prefix', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" prefix="%" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly direction row', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" direction="row" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with value < min', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={-1} name="Name" label="Label" min={10} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with value > max', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={90} name="Name" label="Label" max={10} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" disabled />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error boolean', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" error helper="helper" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error boolean and helper', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" error helper="helper" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error string', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" error="error" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly error string and helper', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={1}
        name="Name"
        label="Label"
        error="error"
        helper="helper"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly input', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" input />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly custom tooltip', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" tooltip="tooltip" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly default tooltip', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" tooltip />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with default ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" options />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" options={options} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom scale', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" possibleValues={scale} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly min max', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" min={1} max={10} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly step', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" step={0.5} />,
    )
    expect(asFragment()).toMatchSnapshot()
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
    await userEvent.type(input, '5')
    await userEvent.tab()
    expect(slider.value).toBe('10')

    await userEvent.clear(input)
    await userEvent.tab()
    expect(slider.value).toBe('2')

    await userEvent.clear(input)
    await userEvent.type(input, '1')
    await userEvent.tab()
    expect(slider.value).toBe('2')

    expect(asFragment()).toMatchSnapshot()
  })
})
