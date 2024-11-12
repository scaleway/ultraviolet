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
  test('render correctly with showMonthYearPicker with default date', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        showMonthYearPicker
        onChange={() => {}}
        value={new Date('1995-02-11T03:24:00.000+00:00')}
        placeholder="YYYY-MM-DD"
      />,
    )

    const input = screen.getByPlaceholderText('YYYY-MM-DD')
    await userEvent.click(input)
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

  test('render correctly with a array of dates to exclude', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        value={new Date('1995-12-11T03:24:00.000+00:00')}
        excludeDates={[
          new Date('1995-12-12T03:24:00.000+00:00'),
          new Date('1995-12-13T03:24:00.000+00:00'),
          new Date('1995-12-14T03:24:00.000+00:00'),
        ]}
        placeholder="YYYY-MM-DD"
        onChange={() => {}}
      />,
    )
    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)

    expect(asFragment()).toMatchSnapshot()
  })

  test('handle correctly click outside', async () => {
    renderWithTheme(
      <>
        Outside
        <DateInput label="Date" onChange={() => {}} placeholder="YYYY-MM-DD" />
      </>,
    )

    const input = screen.getByPlaceholderText('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()
    await userEvent.click(screen.getByText('Outside'))
    await userEvent.click(screen.getByText('Outside'))
    expect(calendar).not.toBeVisible()
  })

  test('handle correctly click to change month', async () => {
    renderWithTheme(
      <>
        Outside
        <DateInput
          label="Date"
          onChange={() => {}}
          placeholder="YYYY-MM-DD"
          value={new Date('1995-12-11T03:24:00.000+00:00')}
        />
      </>,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    const visibleMonth = screen.getByText(/December/i)
    await userEvent.click(screen.getByTestId('previous-month'))
    expect(visibleMonth.textContent).toContain('November')

    await userEvent.click(screen.getByTestId('next-month'))
    expect(visibleMonth.textContent).toContain('December')
  })

  test('handle correctly click to change year', async () => {
    renderWithTheme(
      <>
        Outside
        <DateInput
          label="Date"
          onChange={() => {}}
          placeholder="YYYY-MM-DD"
          value={new Date('1995-12-11T03:24:00.000+00:00')}
          showMonthYearPicker
        />
      </>,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    const visibleMonth = screen.getByText(/1995/i)
    await userEvent.click(screen.getByTestId('previous-month'))
    expect(visibleMonth.textContent).toContain('1994')

    await userEvent.click(screen.getByTestId('next-month'))
    expect(visibleMonth.textContent).toContain('1995')
  })

  test('handle correctly click on date', async () => {
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        value={new Date('1995-12-11T03:24:00.000+00:00')}
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const visibleMonth = screen.getByText(/December/i)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    await userEvent.click(screen.getByText('15'))
    expect(input.value).toBe('1995/12/15')

    const dayFromLastMonth = screen.getAllByText('30')[0] // the first element in this array is necessarily from previous month
    await userEvent.click(dayFromLastMonth)
    expect(visibleMonth.textContent).toContain('November')

    const dayFromNextMonth = screen.getAllByText('1')[1]
    await userEvent.click(dayFromNextMonth)
    expect(visibleMonth.textContent).toContain('December')
  })

  test('handle correctly click on date range', async () => {
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        selectsRange
        value={new Date('1995-02-11T03:24:00.000+00:00')}
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    await userEvent.click(screen.getByText('15'))
    expect(input.value).toBe('1995/02/15 – ')
    const day = screen.getByText('27')

    await userEvent.hover(day)
    await userEvent.unhover(day)

    await userEvent.click(day)
    expect(input.value).toBe('1995/02/15 – 1995/02/27')

    await userEvent.click(screen.getByText('31'))
    expect(input.value).toBe('1995/01/31 – ')
  })

  test('render correctly with showMonthYearPicker with excluded months', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        showMonthYearPicker
        onChange={() => {}}
        value={new Date('1995-02-11T03:24:00.000+00:00')}
        placeholder="YYYY-MM-DD"
        excludeDates={[new Date('1995-10-01'), new Date('1995-02-01')]}
      />,
    )
    const input = screen.getByPlaceholderText('YYYY-MM-DD')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('handle correctly click on date with showmonthYearPicker', async () => {
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        value={new Date('1995-12-11T03:24:00.000+00:00')}
        showMonthYearPicker
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    await userEvent.click(screen.getByText('Jan'))
    expect(input.value).toBe('1995/01')
  })

  test('handle correctly click on date range with showMonthYearPicker', async () => {
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        selectsRange
        showMonthYearPicker
        value={new Date('1995-12-11T03:24:00.000+00:00')}
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    await userEvent.click(screen.getByText('Aug'))
    expect(input.value).toBe('1995/08 – ')
    const month = screen.getByText('Feb')

    await userEvent.hover(month)
    await userEvent.unhover(month)

    await userEvent.click(month)
    expect(input.value).toBe('1995/02 – ')

    await userEvent.click(screen.getByText('Sep'))
    expect(input.value).toBe('1995/02 – 1995/09')
  })

  test('renders correctly custom format with range', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        selectsRange
        startDate={new Date('1995-12-11T03:24:00.000+00:00')}
        endDate={new Date('1995-12-11T03:24:00.000+00:00')}
        name="test"
        autoFocus={false}
        format={value => (value instanceof Date ? value.toISOString() : value)}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
