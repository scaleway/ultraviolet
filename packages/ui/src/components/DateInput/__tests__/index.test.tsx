import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { es, fr, ru } from 'date-fns/locale'
import tk from 'timekeeper'
import { describe, expect, test } from 'vitest'
import { DateInput } from '..'

tk.freeze(new Date(1609503120000))

describe('DateInput', () => {
  test('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        locale={fr}
        value={new Date('1995-12-17T03:24:00.000+00:00').toISOString()}
        name="test"
        autoFocus={false}
        format={value =>
          value instanceof Date ? value.toISOString() : value?.toString()
        }
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" disabled onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" required onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error', () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" error="error" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly error disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" error="error" disabled onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error disabled required', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
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
      <DateInput
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
      <DateInput label="Date" locale={fr} onChange={() => {}} />,
    )
    const buttonContainer = screen.getByLabelText('Date')
    await userEvent.click(buttonContainer)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with date-fns locale es', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" locale={es} onChange={() => {}} />,
    )
    const buttonContainer = screen.getByLabelText('Date')
    await userEvent.click(buttonContainer)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with date-fns locale ru', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" locale={ru} onChange={() => {}} />,
    )
    const buttonContainer = screen.getByLabelText('Date')
    await userEvent.click(buttonContainer)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with showMonthYearPicker', () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" showMonthYearPicker onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with a range of date', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
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
      <DateInput
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
