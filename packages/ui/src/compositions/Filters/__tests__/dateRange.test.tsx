import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import tk from 'timekeeper'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Filters } from '..'
import type { FilterConfig } from '../types'

type FilterValues = {
  dates: {
    startAt: Date | null
    endAt: Date | null
  }
}

const defaultValues: FilterValues = {
  dates: {
    startAt: null,
    endAt: null,
  },
}

const config: FilterConfig<FilterValues>[] = [
  {
    type: 'dateRange',
    name: 'dates',
    label: 'Date Range',
  },
]

const labels = {
  clear: 'Clear',
  clearAll: 'Clear all',
  seeAll: 'All filters',
  drawerHeader: 'Filters',
  submit: 'See results',
}

describe('dateRange filter', () => {
  beforeAll(() => {
    // Freeze time to January 1, 2021 so the calendar always shows January 2021
    tk.freeze(new Date(1_609_503_120_000))
  })

  afterAll(() => {
    tk.reset()
  })

  it('should display the initialValue in the input', () => {
    renderWithTheme(
      <Filters
        config={config}
        defaultValues={defaultValues}
        initialValues={{
          dates: {
            startAt: new Date(2021, 0, 15),
            endAt: new Date(2021, 0, 27),
          },
        }}
        labels={labels}
      />,
    )

    expect(screen.getByRole('textbox', { name: 'Date Range' })).toHaveValue('15/01/2021 - 27/01/2021')
  })

  it('should call submit with the correct dates when changing the range', async () => {
    const onSubmit = vi.fn()

    renderWithTheme(<Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('textbox', { name: 'Date Range' }))

    await userEvent.click(screen.getByText('15'))
    await userEvent.click(screen.getByText('27'))

    expect(onSubmit).toHaveBeenLastCalledWith({
      dates: {
        startAt: new Date(2021, 0, 15),
        endAt: new Date(2021, 0, 27),
      },
    })
  })

  it('should submit with only a start date and an empty end date', async () => {
    const onSubmit = vi.fn()

    renderWithTheme(<Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('textbox', { name: 'Date Range' }))

    await userEvent.click(screen.getByText('15'))

    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({
      dates: {
        startAt: new Date(2021, 0, 15),
        endAt: null,
      },
    })
  })

  it('should allow selecting the same date as start and end date', async () => {
    const onSubmit = vi.fn()

    renderWithTheme(<Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('textbox', { name: 'Date Range' }))

    await userEvent.click(screen.getByText('15'))
    await userEvent.click(screen.getByText('15'))

    expect(onSubmit).toHaveBeenLastCalledWith({
      dates: {
        startAt: new Date(2021, 0, 15),
        endAt: new Date(2021, 0, 15),
      },
    })
  })
})
