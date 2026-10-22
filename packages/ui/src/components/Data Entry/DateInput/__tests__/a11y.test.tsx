import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { DateInput } from '..'

describe('dateInput - A11y', { tags: ['a11y'] }, () => {
  it('announces the element referenced by aria-describedby as the input description', () => {
    renderWithTheme(
      <>
        <span id="date-input-format">Format: 12/24/1995</span>
        <DateInput aria-describedby="date-input-format" label="Date" />
      </>,
    )
    expect(screen.getByRole('textbox', { name: 'Date' })).toHaveAccessibleDescription('Format: 12/24/1995')
  })
})
