import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Slider } from '..'

const options = [
  { label: '1Mb', value: 1 },
  { label: '10MB', value: 10 },
  { label: '100Mb', value: 100 },
  { label: '200Mb', value: 200 },
]

describe('double slider', () => {
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
    shouldMatchSnapshot(
      <Slider
        direction="row"
        double
        label="Label"
        labelDescription="labeldescription"
        name="Name"
        value={[1, 14]}
      />,
    )
  })

  test('renders correctly with value empty', () => {
    shouldMatchSnapshot(
      /* @ts-expect-error testing purpose */
      <Slider double label="Label" name="Name" />,
    )
  })

  test('renders correctly with value empty array and no min max', () => {
    shouldMatchSnapshot(<Slider double label="Label" name="Name" value={[]} />)
  })

  test('renders correctly with value empty array with min max', () => {
    shouldMatchSnapshot(
      <Slider double label="Label" max={10} min={0} name="Name" value={[]} />,
    )
  })

  test('renders correctly direction row double with input', () => {
    shouldMatchSnapshot(
      <Slider
        direction="row"
        double
        input
        label="Label"
        name="Name"
        value={[1, 14]}
      />,
    )
  })

  test('renders correctly double ', () => {
    shouldMatchSnapshot(
      <Slider double label="Label" name="Name" value={[12, 14]} />,
    )
  })

  test('renders correctly double with value outside of min-max', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        data-testid="slider"
        double
        label="Label"
        max={50}
        min={10}
        name="Name"
        value={[-140, 140]}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId<HTMLInputElement>('slider-left').value).toBe('10')
    expect(screen.getByTestId<HTMLInputElement>('slider-right').value).toBe(
      '50',
    )
  })

  test('renders correctly double disabled', () => {
    shouldMatchSnapshot(
      <Slider disabled double label="Label" name="Name" value={[12, 14]} />,
    )
  })

  test('renders correctly double input', () => {
    shouldMatchSnapshot(
      <Slider double input label="Label" name="Name" value={[12, 14]} />,
    )
  })

  test('renders correctly double custom tooltip', () => {
    shouldMatchSnapshot(
      <Slider
        double
        label="Label"
        name="Name"
        tooltip={['tooltip', 'tooltip2']}
        value={[12, 14]}
      />,
    )
  })

  test('renders correctly double default toolip ', () => {
    shouldMatchSnapshot(
      <Slider double label="Label" name="Name" tooltip value={[12, 14]} />,
    )
  })

  test('renders correctly custom value ', () => {
    shouldMatchSnapshot(
      <Slider
        customValueDisplay="customValue"
        double
        label="Label"
        name="Name"
        tooltip
        value={[12, 14]}
      />,
    )
  })

  test('renders correctly custom value - direction "row"', () => {
    shouldMatchSnapshot(
      <Slider
        customValueDisplay="customValue"
        direction="row"
        double
        label="Label"
        name="Name"
        tooltip
        value={[12, 14]}
      />,
    )
  })

  test('renders correctly custom value with input ', () => {
    const { asFragment } = renderWithTheme(
      <Slider
        customValueDisplay="customValue"
        double
        input
        label="Label"
        name="Name"
        tooltip
        value={[12, 14]}
      />,
    )

    expect(screen.getByText('customValue')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double with single tooltip', () => {
    shouldMatchSnapshot(
      <Slider
        double
        label="Label"
        name="Name"
        tooltip="tooltip"
        value={[12, 14]}
      />,
    )
  })

  test('renders correctly double with default ticks', () => {
    shouldMatchSnapshot(
      <Slider double label="Label" name="Name" unit="%" value={[12, 14]} />,
    )
  })

  test('renders correctly double with custom ticks', () => {
    shouldMatchSnapshot(
      <Slider
        double
        label="Label"
        name="Name"
        options={options}
        value={[0, 3]}
      />,
    )
  })

  test('renders correctly double with custom scale', () => {
    shouldMatchSnapshot(
      <Slider
        double
        label="Label"
        name="Name"
        options={options}
        value={[0, 3]}
      />,
    )
  })

  test('renders correctly double min max', () => {
    shouldMatchSnapshot(
      <Slider
        double
        label="Label"
        max={10}
        min={1}
        name="Name"
        value={[1, 4]}
      />,
    )
  })

  test('renders correctly double step', () => {
    shouldMatchSnapshot(
      <Slider double label="Label" name="Name" step={0.5} value={[12, 14]} />,
    )
  })

  test('handles correctly onChange double', async () => {
    const onChange = () => vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        data-testid="slider"
        double
        input
        name="slider"
        onChange={onChange}
        value={[1, 2]}
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    fireEvent.change(sliderRight, { target: { value: '7' } })
    expect(sliderRight.value).toBe('7')

    fireEvent.change(sliderLeft, { target: { value: '3' } })
    expect(sliderLeft.value).toBe('3')

    const inputRight = screen.getByTestId('slider-input-right')
    const inputLeft = screen.getByTestId('slider-input-left')

    await userEvent.type(inputRight, '5')
    await userEvent.click(inputLeft) // simulate onBlur

    expect(sliderRight.value).toBe('75')

    await userEvent.type(inputLeft, '5')
    await userEvent.click(inputRight) // simulate onBlur

    expect(sliderLeft.value).toBe('35')
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly onChange with min and max double', async () => {
    const onChange: (value: number[]) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        data-testid="slider"
        double
        input
        max={10}
        min={2}
        name="slider"
        onChange={onChange}
        value={[3, 5]}
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
        data-testid="slider"
        double
        name="slider"
        onChange={onChange}
        options={options}
        unit="Mb"
        value={[1, 3]}
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    const valueRight = screen.getByTestId('slider-value-right')
    const valueLeft = screen.getByTestId('slider-value-left')

    expect(sliderRight.value).toBe('3')
    expect(valueRight).toHaveTextContent('200Mb')

    fireEvent.change(sliderRight, { target: { value: '2' } })
    expect(sliderRight.value).toBe('2')
    expect(valueRight).toHaveTextContent('100Mb')

    expect(sliderLeft.value).toBe('1')
    expect(valueLeft).toHaveTextContent('10Mb')

    fireEvent.change(sliderLeft, { target: { value: '0' } })
    expect(sliderLeft.value).toBe('0')
    expect(valueLeft).toHaveTextContent('1Mb')
    expect(asFragment()).toMatchSnapshot()
  })
})
