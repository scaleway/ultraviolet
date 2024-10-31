import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { es, fr, ru } from 'date-fns/locale'
import tk from 'timekeeper'
import { describe, expect, test } from 'vitest'
import { DateInputV2 } from '..'

tk.freeze(new Date(1609503120000))

describe('DateInputV2', () => {
  test('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2
        label="Date"
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        locale={fr}
        value={new Date('1995-12-17T03:24:00.000+00:00')}
        name="test"
        autoFocus={false}
        format={value => (value instanceof Date ? value.toISOString() : value)}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" disabled onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" required onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" error="error" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly error disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" error="error" disabled onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error disabled required', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2
        label="Date"
        error="error"
        disabled
        required
        onChange={() => {}}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly min-max', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2
        label="Date"
        minDate={new Date('1995-12-11T03:24:00.000+00:00')}
        maxDate={new Date('1995-12-25T03:24:00.000+00:00')}
        onChange={() => {}}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with date-fns locale fr', async () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" locale={fr} onChange={() => {}} />,
    )
    const buttonContainer = screen.getByLabelText('Date')
    await userEvent.click(buttonContainer)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with date-fns locale es', async () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" locale={es} onChange={() => {}} />,
    )
    const buttonContainer = screen.getByLabelText('Date')
    await userEvent.click(buttonContainer)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with date-fns locale ru', async () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" locale={ru} onChange={() => {}} />,
    )
    const buttonContainer = screen.getByLabelText('Date')
    await userEvent.click(buttonContainer)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with showMonthYearPicker', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2 label="Date" showMonthYearPicker onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with a range of date', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2
        label="Date"
        selectsRange
        startDate={new Date('1995-12-11T03:24:00.000+00:00')}
        endDate={new Date('1995-12-25T03:24:00.000+00:00')}
        onChange={() => {}}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with a array of dates to exclude', () => {
    const { asFragment } = renderWithTheme(
      <DateInputV2
        label="Date"
        value={new Date('1995-12-11T03:24:00.000+00:00')}
        excludeDates={[
          new Date('1995-12-12T03:24:00.000+00:00'),
          new Date('1995-12-13T03:24:00.000+00:00'),
          new Date('1995-12-14T03:24:00.000+00:00'),
        ]}
        onChange={() => {}}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
