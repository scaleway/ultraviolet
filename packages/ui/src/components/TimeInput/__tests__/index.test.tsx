import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TimeInput } from '..'

const DEFAULT_VALUE = new Date('01/01/2000 11:23:14')

describe('timeInput', () => {
  test('renders correctly with base props', () =>
    shouldMatchSnapshot(<TimeInput />))

  test('renders correctly disabled', () =>
    shouldMatchSnapshot(<TimeInput disabled label="test" />))

  test('renders correctly readOnly', () =>
    shouldMatchSnapshot(<TimeInput label="test" readOnly />))

  test('renders correctly with error', () =>
    shouldMatchSnapshot(<TimeInput error="error" label="test" />))

  test('renders correctly clearable', () =>
    shouldMatchSnapshot(<TimeInput clearable label="test" />))

  test('renders correctly required', () =>
    shouldMatchSnapshot(<TimeInput label="test" required />))

  test('renders correctly small', () =>
    shouldMatchSnapshot(<TimeInput label="test" size="small" />))

  test('renders correctly large', () =>
    shouldMatchSnapshot(<TimeInput label="test" size="large" />))

  test('renders correctly with 12-hour format', () =>
    shouldMatchSnapshot(<TimeInput label="test" timeFormat={12} />))

  test('renders correctly with label description and helper', () =>
    shouldMatchSnapshot(
      <TimeInput
        helper="helper"
        label="label"
        labelDescription={<h1>label</h1>}
      />,
    ))

  test('renders correctly with helper and error', () =>
    shouldMatchSnapshot(
      <TimeInput
        error
        helper="helper"
        label="label"
        labelDescription="label description"
      />,
    ))

  test('renders correctly controlled - 12-hour format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInput
        helper="helper"
        label="label"
        labelDescription="labeldescription"
        onChange={mockOnChange}
        timeFormat={12}
        value={DEFAULT_VALUE}
      />,
    )
    const hours = screen.getByTestId('hours-input')
    const period = screen.getByTestId('am-pm-input')
    const seconds = screen.getByTestId('seconds-input')

    await userEvent.type(hours, '12')
    expect(hours).toHaveValue('12')

    await userEvent.type(seconds, '7')
    expect(period).toHaveFocus()

    await userEvent.type(period, 'p')
    expect(period).toHaveValue('PM')

    await userEvent.type(period, 'A')
    expect(period).toHaveValue('AM')

    await userEvent.type(period, 'P')
    expect(period).toHaveValue('PM')

    await userEvent.type(period, 'a')
    expect(period).toHaveValue('AM')

    expect(mockOnChange).toHaveBeenCalled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly controlled - 24-hours format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInput
        helper="helper"
        label="label"
        labelDescription="labeldescription"
        onChange={mockOnChange}
        timeFormat={24}
        value={DEFAULT_VALUE}
      />,
    )
    const hours = screen.getByTestId('hours-input')
    const minutes = screen.getByTestId('minutes-input')
    const seconds = screen.getByTestId('seconds-input')

    await userEvent.type(minutes, '3')
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(minutes).toHaveValue('03')

    await userEvent.type(minutes, '2')
    expect(minutes).toHaveValue('32')
    expect(seconds).toHaveFocus()

    await userEvent.type(seconds, '31')
    expect(seconds).toHaveValue('31')

    await userEvent.type(hours, '23')
    expect(hours).toHaveValue('23')

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly clearable', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInput
        clearable
        helper="helper"
        label="label"
        labelDescription="labeldescription"
        onChange={mockOnChange}
        timeFormat={12}
        value={DEFAULT_VALUE}
      />,
    )
    await userEvent.click(screen.getByTestId('clear'))
    expect(mockOnChange).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders can move with arrow keys - 12-hour format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInput
        helper="helper"
        label="label"
        labelDescription="labeldescription"
        onChange={mockOnChange}
        timeFormat={12}
        value={DEFAULT_VALUE}
      />,
    )

    const hours = screen.getByTestId('hours-input')
    const seconds = screen.getByTestId('seconds-input')
    const period = screen.getByTestId('am-pm-input')

    await userEvent.click(hours)
    await userEvent.keyboard('[ArrowUp][ArrowUp]')
    expect(hours).toHaveValue('01')
    expect(mockOnChange).toHaveBeenCalledTimes(2)
    await userEvent.keyboard('[ArrowDown]')
    expect(hours).toHaveValue('12')

    await userEvent.click(period)
    await userEvent.keyboard('[ArrowDown]')
    expect(period).toHaveValue('PM')

    await userEvent.keyboard('[ArrowLeft]')
    expect(seconds).toHaveFocus()

    await userEvent.keyboard('[ArrowRight]')
    expect(period).toHaveFocus()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders can move with arrow keys - 24-hour format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInput
        clearable
        helper="helper"
        label="label"
        labelDescription="labeldescription"
        onChange={mockOnChange}
        timeFormat={24}
        value={DEFAULT_VALUE}
      />,
    )
    const hours = screen.getByTestId('hours-input')
    const minutes = screen.getByTestId('minutes-input')
    const seconds = screen.getByTestId('seconds-input')

    await userEvent.click(seconds)
    await userEvent.keyboard('[ArrowUp]')
    expect(seconds).toHaveValue('15')
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    await userEvent.keyboard('[ArrowDown]')
    expect(seconds).toHaveValue('14')

    await userEvent.click(minutes)
    await userEvent.keyboard('[ArrowUp]')
    expect(minutes).toHaveValue('24')
    await userEvent.keyboard('[ArrowDown]')
    expect(minutes).toHaveValue('23')

    await userEvent.type(hours, '23')
    await userEvent.click(hours)
    await userEvent.keyboard('[ArrowUp]')
    expect(hours).toHaveValue('00')
    await userEvent.keyboard('[ArrowDown]')
    expect(hours).toHaveValue('23')

    await userEvent.keyboard('[ArrowRight]')
    expect(minutes).toHaveFocus()

    await userEvent.keyboard('[ArrowLeft]')
    expect(hours).toHaveFocus()

    expect(asFragment()).toMatchSnapshot()
  })
})
