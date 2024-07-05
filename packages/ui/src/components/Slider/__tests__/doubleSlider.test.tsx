import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Slider } from '..'

const options = [
  { label: '1 Mb', value: 1 },
  { label: '30MB', value: 30 },
]
const scale = [1, 2, 3, 4, 5, 10, 15, 20, 25]

describe('Double slider', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    })
  })

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {})
  })

  test('renders correctly direction row double', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[1, 14]}
        name="Name"
        label="Label"
        direction="row"
        double
      />,
    )
  })
  test('renders correctly direction row double with input', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[1, 14]}
        name="Name"
        label="Label"
        direction="row"
        double
        input
      />,
    )
  })

  test('renders correctly double ', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={[12, 14]} name="Name" label="Label" double />,
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

  test('renders correctly double disabled', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={[12, 14]} name="Name" label="Label" disabled double />,
    )
  })

  test('renders correctly double input', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={[12, 14]} name="Name" label="Label" input double />,
    )
  })

  test('renders correctly double custom tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        tooltip={['tooltip', 'tooltip2']}
        double
      />,
    )
  })

  test('renders correctly double default toolipt ', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={[12, 14]} name="Name" label="Label" tooltip double />,
    )
  })
  test('renders correctly double with single tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        tooltip="tooltip"
        double
      />,
    )
  })

  test('renders correctly double with default ticks', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        options
        double
        unit="%"
      />,
    )
  })

  test('renders correctly double with custom ticks', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        options={options}
        double
      />,
    )
  })

  test('renders correctly double with custom scale', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[12, 14]}
        name="Name"
        label="Label"
        possibleValues={scale}
        double
      />,
    )
  })

  test('renders correctly double min max', () => {
    shouldMatchEmotionSnapshot(
      <Slider
        value={[1, 4]}
        name="Name"
        label="Label"
        min={1}
        max={10}
        double
      />,
    )
  })

  test('renders correctly double step', () => {
    shouldMatchEmotionSnapshot(
      <Slider value={[12, 14]} name="Name" label="Label" step={0.5} double />,
    )
  })

  test('handles correctly onChange double', async () => {
    const onChange = () => vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={[1, 2]}
        double
        input
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
    expect(sliderLeft.value).toBe('10')

    await userEvent.clear(inputLeft)
    await userEvent.tab()
    expect(sliderLeft.value).toBe('2')

    await userEvent.clear(inputRight)
    await userEvent.tab()
    expect(sliderRight.value).toBe('10')
    expect(asFragment()).toMatchSnapshot()
  })
  test('handles correctly onChange custom scale double', () => {
    const onChange: (value: number[]) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={[2, 4]}
        double
        possibleValues={[1, 3, 5, 6, 10]}
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    const valueRight = screen.getByTestId('slider-value-right')
    const valueLeft = screen.getByTestId('slider-value-left')

    expect(sliderRight.value).toBe('4')
    expect(valueRight).toHaveTextContent('10')

    fireEvent.change(sliderRight, { target: { value: '3' } })
    expect(sliderRight.value).toBe('3')
    expect(valueRight).toHaveTextContent('6')

    expect(sliderLeft.value).toBe('2')
    expect(valueLeft).toHaveTextContent('5')

    fireEvent.change(sliderLeft, { target: { value: '1' } })
    expect(sliderLeft.value).toBe('1')
    expect(valueLeft).toHaveTextContent('3')
    expect(asFragment()).toMatchSnapshot()
  })
})
