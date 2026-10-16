import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Filters } from '..'
import type { FilterConfig } from '../types'

type FilterValues = {
  date: Date | null
}

const defaultValues: FilterValues = {
  date: null,
}

const config: FilterConfig<FilterValues>[] = [
  {
    type: 'date',
    name: 'date',
    label: 'Date',
  },
]

const labels = {
  clear: 'Clear',
  clearAll: 'Clear all',
  seeAll: 'All filters',
  drawerHeader: 'Filters',
  submit: 'See results',
}

describe('date filter', () => {
  beforeAll(() => {
    // Freeze time to January 1, 2021 so the calendar always shows January 2021
    vi.useFakeTimers({ now: new Date(1_609_503_120_000), toFake: ['Date'] })
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should display the initialValue in the input', () => {
    renderWithTheme(
      <Filters
        config={config}
        defaultValues={defaultValues}
        initialValues={{ date: new Date(2021, 0, 15) }}
        labels={labels}
      />,
    )

    expect(screen.getByRole('textbox', { name: 'Date' })).toHaveValue('15/01/2021')
  })

  it('should call submit with the selected date', async () => {
    const onSubmit = vi.fn()

    renderWithTheme(<Filters config={config} defaultValues={defaultValues} labels={labels} onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('textbox', { name: 'Date' }))

    await userEvent.click(screen.getByText('15'))

    expect(onSubmit).toHaveBeenLastCalledWith({
      date: new Date(2021, 0, 15),
    })
  })
})
