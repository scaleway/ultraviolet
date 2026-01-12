import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { es, fr, ru } from 'date-fns/locale'
import tk from 'timekeeper'
import { describe, expect, test, vi } from 'vitest'
import { DateInput } from '..'

tk.freeze(new Date(1_609_503_120_000))

describe('dateInput', () => {
  test('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        format={value => (value instanceof Date ? value.toISOString() : value)}
        label="Date"
        locale={fr}
        name="test"
        onBlur={() => {}}
        onChange={() => {}}
        onFocus={() => {}}
        value={new Date('1995-12-17T03:24:00.000+00:00')}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInput disabled label="Date" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', () => {
    const { asFragment } = renderWithTheme(
      <DateInput label="Date" onChange={() => {}} required />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error', () => {
    const { asFragment } = renderWithTheme(
      <DateInput error="error" label="Date" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly error disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInput disabled error="error" label="Date" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly error disabled required', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        disabled
        error="error"
        label="Date"
        onChange={() => {}}
        required
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly min-max', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        maxDate={new Date('1995-12-25T03:24:00.000+00:00')}
        minDate={new Date('1995-12-11T03:24:00.000+00:00')}
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
      <DateInput label="Date" onChange={() => {}} showMonthYearPicker />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('render correctly with showMonthYearPicker with default date', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        showMonthYearPicker
        value={new Date('1995-02-11T03:24:00.000+00:00')}
      />,
    )

    const input = screen.getByPlaceholderText('YYYY-MM-DD')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInput disabled label="Date" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with input = "calendar', () => {
    const { asFragment } = renderWithTheme(
      <DateInput input="calendar" label="Date" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with input = "calendar disabled', () => {
    const { asFragment } = renderWithTheme(
      <DateInput disabled input="calendar" label="Date" onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with a array of dates to exclude', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        excludeDates={[
          new Date('1995-12-12T03:24:00.000+00:00'),
          new Date('1995-12-13T03:24:00.000+00:00'),
          new Date('1995-12-14T03:24:00.000+00:00'),
        ]}
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        value={new Date('1995-12-11T03:24:00.000+00:00')}
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
          showMonthYearPicker
          value={new Date('1995-12-11T03:24:00.000+00:00')}
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

    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    await userEvent.click(input)

    await userEvent.click(screen.getByText('15'))
    expect(input.value).toBe('12/15/1995')

    await userEvent.click(input)

    const dayFromLastMonth = screen.getAllByText('30')[0] // the first element in this array is from previous month
    await userEvent.click(dayFromLastMonth)

    await userEvent.click(input)
    expect(input.value).toBe('11/30/1995')

    await userEvent.click(input)
    const dayFromNextMonth = screen.getAllByText('1')[1]
    await userEvent.click(dayFromNextMonth)
    expect(input.value).toBe('12/01/1995')
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
    expect(input.value).toBe('02/15/1995 - ')
    const day = screen.getByText('27')

    await userEvent.hover(day)
    await userEvent.unhover(day)

    await userEvent.click(day)
    expect(input.value).toBe('02/15/1995 - 02/27/1995')

    await userEvent.click(input)
    await userEvent.click(screen.getByText('31'))
    expect(input.value).toBe('01/31/1995 - ')

    await userEvent.click(screen.getByText('20'))
    expect(input.value).toBe('01/20/1995 - 01/31/1995')
  })

  test('render correctly with showMonthYearPicker with excluded months', async () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        excludeDates={[new Date('1995-10-01'), new Date('1995-02-01')]}
        label="Date"
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        showMonthYearPicker
        value={new Date('1995-02-11T03:24:00.000+00:00')}
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
        showMonthYearPicker
        value={new Date('1995-12-11T03:24:00.000+00:00')}
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeVisible()

    await userEvent.click(screen.getByText('Jan'))
    expect(input.value).toBe('01/1995')
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
    expect(input.value).toBe('08/1995 - ')
    const month = screen.getByText('Feb')

    await userEvent.hover(month)
    await userEvent.unhover(month)

    await userEvent.click(month)
    expect(input.value).toBe('02/1995 - 08/1995')

    await userEvent.click(input)
    await userEvent.click(screen.getByText('Sep'))
    expect(input.value).toBe('09/1995 - ')

    await userEvent.click(screen.getByText('Dec'))
    expect(input.value).toBe('09/1995 - 12/1995')
  })

  test('renders correctly custom format with range', () => {
    const { asFragment } = renderWithTheme(
      <DateInput
        endDate={new Date('1995-12-11T03:24:00.000+00:00')}
        format={value => (value instanceof Date ? value.toISOString() : value)}
        label="Date"
        name="test"
        onBlur={() => {}}
        onChange={() => {}}
        onFocus={() => {}}
        selectsRange
        startDate={new Date('1995-12-11T03:24:00.000+00:00')}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('handle correctly type in input', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={mockOnChange}
        placeholder="YYYY-MM-DD"
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)

    await userEvent.type(input, '08/21/1995')
    input.blur()
    expect(mockOnChange).toBeCalled()
    expect(screen.getByText('August', { exact: false })).toBeInTheDocument()
  })

  test('handle correctly type in input with select range', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={mockOnChange}
        placeholder="YYYY-MM-DD"
        selectsRange
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)

    await userEvent.type(input, '08/21/1995')
    input.blur()
    expect(mockOnChange).toBeCalled()
    expect(screen.getByText('August', { exact: false })).toBeInTheDocument()
  })

  test('handle correctly type in input with showMonthYearPicker', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={mockOnChange}
        placeholder="YYYY-MM-DD"
        showMonthYearPicker
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)

    await userEvent.type(input, '2000/08')
    input.blur()

    expect(mockOnChange).toBeCalled()
    expect(screen.getByText('2000', { exact: false })).toBeInTheDocument()
  })

  test('handle correctly type in input with select range and showMonthYearPicker', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <DateInput
        label="Date"
        onChange={mockOnChange}
        placeholder="YYYY-MM-DD"
        selectsRange
        showMonthYearPicker
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    await userEvent.type(input, '2000/08')
    input.blur()
    expect(mockOnChange).toBeCalled()
    expect(screen.getByText('2000', { exact: false })).toBeInTheDocument()
  })
})
