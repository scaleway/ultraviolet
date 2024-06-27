import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Slider } from '..'

const options = [
  { label: '1 Mb', value: 1 },
  { label: '30MB', value: 30 },
]
const scale = [1, 2, 3, 4, 5, 10, 15, 20, 25]

describe('Slider', () => {
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

  test('renders correctly direction row double', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[1, 14]}
        name="Name"
        label="Label"
        direction="row"
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double ', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double with swaped min-max', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[14, 12]}
        name="Name"
        label="Label"
        data-testid="slider"
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId<HTMLInputElement>('slider-left').value).toBe('12')
    expect(screen.getByTestId<HTMLInputElement>('slider-right').value).toBe(
      '14',
    )
  })

  test('renders correctly double with value outside of min-max', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[-140, 140]}
        name="Name"
        label="Label"
        min={10}
        max={50}
        data-testid="slider"
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId<HTMLInputElement>('slider-left').value).toBe('10')
    expect(screen.getByTestId<HTMLInputElement>('slider-right').value).toBe(
      '50',
    )
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

  test('renders correctly double disabled', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" disabled double />,
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

  test('renders correctly double input', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" input double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly custom tooltip', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" tooltip="tooltip" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double custom tooltip', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        tooltip={['tooltip', 'tooltip2']}
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly default tooltip', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" tooltip />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double default toolipt ', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" tooltip double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly with default ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" options />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double with default ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" options double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" options={options} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double with custom ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        options={options}
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom scale', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" possibleValues={scale} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double with custom scale', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        possibleValues={scale}
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly min max', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" min={1} max={10} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double min max', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        value={[1, 4]}
        name="Name"
        label="Label"
        min={1}
        max={10}
        double
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly step', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={1} name="Name" label="Label" step={0.5} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double step', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" step={0.5} double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly onChange', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        data-testid="slider"
        value={1}
        input
        double={false}
        onChange={onChange}
      />,
    )
    const slider = screen.getByTestId<HTMLInputElement>('slider')
    fireEvent.change(slider, { target: { value: '5' } })
    expect(slider.value).toBe('5')
    const input = screen.getByTestId('slider-input')
    await userEvent.type(input, '5')
    expect(slider.value).toBe('55')
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly onChange double', async () => {
    const onChange: (value: number[]) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={[1, 2]}
        input
        double
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    fireEvent.change(sliderRight, { target: { value: '7' } })
    expect(sliderRight.value).toBe('7')

    fireEvent.change(sliderLeft, { target: { value: '3' } })
    expect(sliderLeft.value).toBe('3')

    const inputRight = screen.getByTestId('slider-input-right')
    await userEvent.type(inputRight, '5')
    expect(sliderRight.value).toBe('75')

    const inputLeft = screen.getByTestId('slider-input-left')
    await userEvent.type(inputLeft, '5')
    expect(sliderLeft.value).toBe('35')
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

  test('handles correctly onChange with min and max double', async () => {
    const onChange: (value: number[]) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={[3, 5]}
        input
        max={10}
        min={2}
        double
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    const inputRight = screen.getByTestId('slider-input-right')
    await userEvent.type(inputRight, '5')
    await userEvent.tab()
    expect(sliderRight.value).toBe('10')

    const inputLeft = screen.getByTestId('slider-input-left')
    await userEvent.type(inputLeft, '5')
    await userEvent.tab()
    expect(sliderLeft.value).toBe('9')

    await userEvent.clear(inputLeft)
    await userEvent.tab()
    expect(sliderLeft.value).toBe('2')

    await userEvent.clear(inputRight)
    await userEvent.tab()
    expect(sliderRight.value).toBe('10')
    expect(asFragment()).toMatchSnapshot()
  })
})
