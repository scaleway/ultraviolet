import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
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

  test('renders correctly double disabled', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" disabled double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double input', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" input double />,
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

  test('renders correctly double default toolipt ', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" tooltip double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly double with default ticks', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" options double />,
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

  test('renders correctly double step', () => {
    const { asFragment } = renderWithTheme(
      <Slider value={[12, 14]} name="Name" label="Label" step={0.5} double />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
